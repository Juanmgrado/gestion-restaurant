import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';
import { HttpService } from '@nestjs/axios'
import { IStatus, Reservation } from 'src/entities/reservation.entity';
import { DataSource, Repository } from 'typeorm';
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
    private readonly nodemailerService: NodemailerService,
    private readonly dataSource: DataSource
  ) {
    this.client = client;
  }
  async createOrder(reservationUuid: string, currency: string): Promise<any> {
    console.log('Reservation UUID:', reservationUuid); // Verificar UUID de la reserva
    console.log('Currency:', currency); // Verificar código de moneda
  
    let reservationPayment = await this.reservationRepository.findOneBy({
      uuid: reservationUuid,
    });
  
    if (!reservationPayment) {
      console.error('Reserva no encontrada');
      throw new NotFoundException('Reserva no encontrada');
    }
  
    console.log('Reservation Payment:', reservationPayment); // Mostrar detalles de la reserva encontrada
  
    const newPayment = new Payment();
    let amountValue = reservationPayment.reservationWorth;
  
    console.log('Amount Value:', amountValue); // Verificar el valor de la reserva
  
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
  
    const requestBody = {
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
    };
  
    console.log('Request Body:', JSON.stringify(requestBody, null, 2)); // Verificar el cuerpo completo de la solicitud
  
    request.requestBody(requestBody);
  
    try {
      const order = await this.client.execute(request);
  
      console.log('Order Response:', JSON.stringify(order, null, 2)); // Verificar la respuesta de PayPal
  
      newPayment.id = order.result.id;
      newPayment.reservation = reservationPayment;
  
      console.log('Saving New Payment:', newPayment); // Verificar datos del pago antes de guardar
      await this.paymentRepository.save(newPayment);
  
      reservationPayment.payment = newPayment;
  
      console.log('Saving Updated Reservation:', reservationPayment); // Verificar reserva actualizada antes de guardar
      await this.reservationRepository.save(reservationPayment);
  
      const approveLink = order.result.links.find((link) => link.rel === 'approve').href;
      console.log('Approve Link:', approveLink); // Verificar enlace de aprobación
  
      return approveLink;
    } catch (err) {
      console.error('Error al crear la orden de PayPal:', err); // Mostrar error completo
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
  
    return await this.dataSource.transaction(async (manager) => {
      const order = await this.client.execute(request);
  
      const founPayment = await manager.getRepository(Payment).findOne({
        where: { id: paymentId },
        relations: ['reservation'],
      });
  
      if (!founPayment) throw new NotFoundException('Orden no hallada');
  
      const reservation = await manager.getRepository(Reservation).findOne({
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
  
          await manager.getRepository(Reservation).update(reservation.uuid, { status: IStatus.active });
  
          founPayment.user = reservation.user;
          await manager.getRepository(Payment).save(founPayment);
          await this.nodemailerService.reservActiveMail(reservation.user.email, founPayment.id);
  
          return {
            message: 'Pago capturado y registro creado.',
            paymentStatus: founPayment.status,
          };
        }
  
        if (order.result.status === 'DECLINED') {
          founPayment.status = 'DECLINED';
  
          await this.nodemailerService.paymentReservFailMail(reservation.user.email, reservation.uuid);
  
          return {
            message: 'Pago rechazado',
          };
        }
      } catch (err) {
        throw new InternalServerErrorException(`Error al capturar la orden de PayPal: ${err.message}`);
      }
    });
  }
}  