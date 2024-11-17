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

    async createReservation(newReservation: CreateReservationDto, userUuid: string): Promise <ReturnedReservation |null> {

        const { startTime, tableNumber, day } = newReservation;
        
        const foundUser = await this.userRepository.findOneBy({uuid: userUuid})
            if(!foundUser) throw new NotFoundException('Usuario no encontrado');
        
        const foundTable = await this.tableRespository.findOneBy({tableNumber})
            if (!foundTable) throw new NotFoundException('Número de mesa incorrecto');

            const existingReservation = await this.reservationsRespository.findOne({
                where: {
                    tableNumber: tableNumber,  
                    startTime: startTime,
                    day: day  
                },
              });
              
              if (existingReservation) throw new ConflictException('Reserva no disponible')    
        
        const createdReservation = new Reservation()
            Object.assign(createdReservation, newReservation)
            createdReservation.table = foundTable,
            createdReservation.user = foundUser
            
            await this.reservationsRespository.save(createdReservation);

        return {
            reservIdentification: createdReservation.uuid,
            day: createdReservation.day,
            startTime: createdReservation.startTime,
            guest: createdReservation.guests,
            tableNumber: createdReservation.tableNumber,
            user: foundUser.username
        }
            
    }
}
