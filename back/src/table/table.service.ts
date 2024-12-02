import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTableDto } from 'src/dtos/addTable.dto';
import { Table } from 'src/entities/table.entity';
import { In, Not, Or, Repository } from 'typeorm';
import * as data from '../../data.json'
import { IStatus, Reservation } from 'src/entities/reservation.entity';


@Injectable()
export class TableService {
    constructor(
        @InjectRepository(Table)
        private readonly tableRepository: Repository <Table>,
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository <Reservation>
    ){}

    
    async tableSeeder(){
        

        data?.map(async table => {
            
            await this.tableRepository.
            createQueryBuilder()
            .insert()
            .into(Table)
            .values({
                tableNumber: table.tableNumber})
            .execute()
        })
        
        return {message: "Mesa agregadas con éxito"};
    }


    async addTable(newTable: CreateTableDto): Promise<{message:string} | null> {
        const { tableNumber } = newTable;
      
        const existingTable = await this.tableRepository.findOneBy({ tableNumber });
        if (existingTable) throw new ConflictException('Número de mesa existente');
      
        const createdTable = this.tableRepository.create(newTable); 
        await this.tableRepository.save(createdTable); 
      
        return { message: 'Mesa agregada con éxito'};
    }

    async availableTables(date: Date): Promise<Table[] | null>{
        
        const reservedTables = await this.reservationRepository.find({
          where: { date, status: IStatus.active },
          relations: ['table'], 
        });
        
        const reservedTableIds = reservedTables.map(reservation => reservation.table.uuid);
        
        const freeTables = await this.tableRepository.find({
          where: {
            uuid: Not(In(reservedTableIds)),
          },
        });

        return freeTables;
    }

    async tablesStatus(day: Date, startTime: Date): Promise<{
        free: Table[];
        reserved: Table[];
        occupied: Table[];
    }> {
        const reservations = await this.reservationRepository.find({
            where: { 
                day, 
                startTime 
            },
            relations: ['table'], 
        });
    
        const occupiedReservations = reservations.filter(
            reservation => reservation.status === IStatus.active
        );
    
        const reservedReservations = reservations.filter(
            reservation => reservation.status === IStatus.pending
        );
    
        const occupiedTableIds = occupiedReservations.map(reservation => reservation.table.uuid);
        const reservedTableIds = reservedReservations.map(reservation => reservation.table.uuid);
    
        const allTables = await this.tableRepository.find();
    
        const freeTables = allTables.filter(
            table => !occupiedTableIds.includes(table.uuid) && !reservedTableIds.includes(table.uuid)
        );
        const reservedTables = allTables.filter(table => reservedTableIds.includes(table.uuid));
        const occupiedTables = allTables.filter(table => occupiedTableIds.includes(table.uuid));
    
        return {
            free: freeTables,
            reserved: reservedTables,
            occupied: occupiedTables,
        };
    }
    
    
    
}



