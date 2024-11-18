import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from 'src/dtos/reservation.dto';
import { ReturnedReservation } from 'src/dtos/ReturnedReservation.dto';
import { Reservation } from 'src/entities/reservation.entity';
import { Table } from 'src/entities/table.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository <User>,
        @InjectRepository(Table)
        private readonly tableRespository: Repository <Table>,
        @InjectRepository(Reservation)
        private readonly reservationsRespository: Repository <Reservation>
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

        return {
            reservIdentification: createdReservation.uuid,
            day: createdReservation.day,
            startTime: createdReservation.startTime,
            guest: createdReservation.guests,
            tableNumber: createdReservation.tableNumber,
            status: createdReservation.status,
            user: foundUser.username,
        };
    }

}
