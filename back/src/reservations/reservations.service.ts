import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from 'src/dtos/reservation.dto';
import { ReturnedReservation } from '../dtos/returnedReservationType';
import { IStatus, Reservation } from 'src/entities/reservation.entity';
import { Table } from 'src/entities/table.entity';
import { User } from 'src/entities/user.entity';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository <User>,
        @InjectRepository(Table)
        private readonly tableRespository: Repository <Table>,
        @InjectRepository(Reservation)
        private readonly reservationsRespository: Repository <Reservation>,
        private readonly nodemailerService: NodemailerService
    ){}


    async createReservation(newReservation: CreateReservationDto, userUuid: string): Promise<ReturnedReservation | null> {
        const { startTime, tableNumber, day, guests } = newReservation;

        const foundUser = await this.userRepository.findOne({ where: { uuid: userUuid } });
        if (!foundUser) throw new NotFoundException('Usuario no encontrado');

        const foundTable = await this.tableRespository.findOne({ where: { tableNumber } });
        if (!foundTable) throw new NotFoundException('Número de mesa incorrecto');

        
        const createdReservation = this.reservationsRespository.create({
            day,
            startTime,
            guests,
            tableNumber,
            table: foundTable,
            user: foundUser,
        });

        await this.reservationsRespository.save(createdReservation);

        const returnedReservation:ReturnedReservation  = {
            reservIdentification: createdReservation.uuid,
            day: createdReservation.day,
            startTime: createdReservation.startTime,
            guest: createdReservation.guests,
            tableNumber: createdReservation.tableNumber,
            status: createdReservation.status,
            username: foundUser.username,
        };
        
        await this.nodemailerService.reservationMail(foundUser.email, returnedReservation)
        return returnedReservation;
    }

    async actualiceStatus(reservationUuid: string, newStatus: IStatus): Promise< string | null >{

        const foundReservations = await this.reservationsRespository.findOneBy({uuid: reservationUuid})
            if (!foundReservations) throw new NotFoundException ('Reserva no encontrada')
        
        foundReservations.status = newStatus;

        await this.reservationsRespository.save(foundReservations)

        return 'Eestado actualizado con éxito'
    }

}
