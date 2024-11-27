import { Module } from '@nestjs/common';
import { PaypalController } from './paypal.controller';
import { PaypalService } from './paypal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { Payment } from 'src/entities/payment.entity';
import { ReservationsService } from 'src/reservations/reservations.service';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { User } from 'src/entities/user.entity';
import { Table } from 'typeorm';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Reservation, Payment, User, Table]),
    ReservationsModule
  ],
  controllers: [PaypalController],
  providers: [PaypalService, ReservationsService, NodemailerService]
})
export class PaypalModule {}
