import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from 'src/dtos/reservation.dto';
import { ReturnedReservation } from '../dtos/returnedReservationType';
import { IStatus, Reservation } from 'src/entities/reservation.entity';
import { Table } from 'src/entities/table.entity';
import { User } from 'src/entities/user.entity';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository <User>,
        @InjectRepository(Table)
        private readonly tableRespository: Repository <Table>,
        @InjectRepository(Reservation)
        private readonly reservationsRespository: Repository <Reservation>,
        private readonly nodemailerService: NodemailerService,
        private readonly datasource: DataSource
    ){}

    async createReservation(newReservation: CreateReservationDto, userUuid: string): Promise<ReturnedReservation | null> {
        const { startTime, tableNumber, day, guests } = newReservation;
        
        return await this.datasource.transaction(async (manager) =>{

            const foundUser = await manager.getRepository(User).findOne({
                 where: { uuid: userUuid } });
                if (!foundUser) throw new NotFoundException('Usuario no encontrado');
            
            const foundTable = await manager.getRepository(Table).findOne({ 
                where: { tableNumber },
                lock: {mode: 'pessimistic_write'} });
                    if (!foundTable) throw new NotFoundException('Número de mesa incorrecto');
            
        
            const createdReservation = await manager.getRepository(Reservation).create({
                day,
                startTime,
                guests,
                tableNumber,
                table: foundTable
            });

            await manager.getRepository(Reservation).save(createdReservation);
            
            createdReservation.user = foundUser;
            await manager.getRepository(Reservation).save(createdReservation)
            
            const returnedReservation:ReturnedReservation  = {
                reservIdentification: createdReservation.uuid,
                day: createdReservation.day,
                startTime: createdReservation.startTime,
                guest: createdReservation.guests,
                reservationWorth: createdReservation.reservationWorth,
                tableNumber: createdReservation.tableNumber,
                status: createdReservation.status
            };
            
            await this.nodemailerService.reservationMail(foundUser.email, returnedReservation)
            return returnedReservation;
        })
    }

    async actualiceStatus(reservationUuid: string, newStatus: IStatus): Promise< string | null >{

        const foundReservations = await this.reservationsRespository.findOneBy({uuid: reservationUuid})
            if (!foundReservations) throw new NotFoundException ('Reserva no encontrada')
        
        foundReservations.status = newStatus;

        await this.reservationsRespository.save(foundReservations)

        return 'Estado actualizado con éxito'
    }

    async getUserReservations(userUuid: string): Promise <ReturnedReservation[] | null>{

        try{
            const foundUser = await this.userRepository.findOne({
                where: { uuid: userUuid },
                relations: ['reservations'],
             });
                if (!foundUser) throw new NotFoundException('Usuario no encontrado')

            const returnedReservations: ReturnedReservation[] = foundUser.reservations.map((reservation) => {
                return {
                    reservIdentification: reservation.uuid,
                    day: reservation.day,
                    startTime: reservation.startTime,
                    guest: reservation.guests,
                    reservationWorth: reservation.reservationWorth,
                    tableNumber: reservation.tableNumber,
                    status: reservation.status,
                    } as ReturnedReservation;
                });
            
            return returnedReservations
        
        }catch(error){
            throw new ConflictException('Error en el servidor')
        }
    }
}