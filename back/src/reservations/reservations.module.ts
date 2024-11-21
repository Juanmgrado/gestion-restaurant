import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Reservation } from 'src/entities/reservation.entity';
import { Table } from 'src/entities/table.entity';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      User, 
      Reservation, 
      Table
    ])
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, NodemailerService]
})
export class ReservationsModule {}
