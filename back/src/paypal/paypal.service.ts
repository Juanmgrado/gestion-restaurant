import { Injectable, NotFoundException } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';
import { HttpService } from '@nestjs/axios'
import { IStatus, Reservation } from 'src/entities/reservation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import client from 'src/config/pyapal.config';
import { Payment } from 'src/entities/payment.entity';
import { ReservationsService } from 'src/reservations/reservations.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';

@Injectable()
export class PaypalService {
    private client: paypal.core.PayPalHttpClient;
  httpService: HttpService;

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly reservationsService: ReservationsService,
    private readonly nodemailerService: NodemailerService
  ) {
    this.client = client;
  }

  async createOrder(reservationUuid: string, currency: string): Promise<any> {
    
    let reservationPayment = await this.reservationRepository.findOneBy({
      uuid: reservationUuid,
    });
    
    if (!reservationPayment)
        throw new NotFoundException('Reserva no encontrada');
    
    const newPayment = new Payment()
    let amountValue = reservationPayment.reservationWorth;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');

    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amountValue,
          },
          reference_id: reservationPayment.uuid,
        },
      ],
      application_context: {
        return_url: `http://localhost:3000/?paymentOrder=${reservationPayment.uuid}`,
        cancel_url: `http://tu-aplicacion.com/paypal/cancel=${reservationPayment.uuid}`,
      },
    });

    try {
      const order = await this.client.execute(request);

      newPayment.id = order.result.id;
      newPayment.reservation = reservationPayment
    
      await this.paymentRepository.save(newPayment)
      reservationPayment.payment = newPayment;

      await this.reservationRepository.save(reservationPayment)

      return order.result.links.find((link) => link.rel === 'approve').href;
    } catch (err) {
      throw new Error(`Error al crear la orden de PayPal: ${err.message}`);
    }
  }

  async captureOrder(
    token: string,
    payerId: string,
    paymentId: string,
  ): Promise<any> {
    const request = new paypal.orders.OrdersCaptureRequest(token);
    request.requestBody({
      payer_id: payerId,
    });

    const order = await this.client.execute(request);
    const founPayment = await this.paymentRepository.findOne({
      where: { id: paymentId },
      relations: ['reservation'],
    });

    if (!founPayment) throw new NotFoundException('Orden no hallada');

    const reservation = await this.reservationRepository.findOne({
      where: { uuid: founPayment.reservation.uuid },
      relations: ['payment', 'user'],
    });
    if (!reservation) throw new NotFoundException('Reserva no encontrada');

    try {
      if (order.result.status === 'COMPLETED') {
        founPayment.total =
          order.result.purchase_units[0].payments.captures[0].amount.value;
        founPayment.currency =
          order.result.purchase_units[0].payments.captures[0].amount.currency_code;
        founPayment.payerEmail =
          order.result.payment_source.paypal.email_address;
        founPayment.status =
          order.result.purchase_units[0].payments.captures[0].status;
        founPayment.payerId = order.result.payer.payer_id;

        await this.reservationsService.actualiceStatus(reservation.uuid, IStatus.active)
        
        founPayment.user = reservation.user
        await this.paymentRepository.save(founPayment);
        await this.nodemailerService.reservActiveMail(reservation.user.email, founPayment.id)

            return {
            message: 'Pago capturado y registro creado.',
            paymentStatus: founPayment.status,
            };
        }

      if (order.result.status === 'DECLINED') {
        founPayment.status = 'DECLINED';

        await this.nodemailerService.paymentReservFailMail(reservation.user.email, reservation.uuid)
        
            return {
            message: 'Pago rechazado',
            };
        }
    } catch (err) {
      throw new Error(`Error al capturar la orden de PayPal: ${err.message}`);
    }
  }
}
