import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTableDto } from 'src/dtos/addTable.dto';
import { ITableState, Table } from 'src/entities/table.entity';
import { In, Not, Repository } from 'typeorm';
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
        
        return "Mesas agregadas con éxito";
    }


    async addTable(newTable: CreateTableDto) {
        const { tableNumber } = newTable;
      
        const existingTable = await this.tableRepository.findOneBy({ tableNumber });
        if (existingTable) throw new ConflictException('Número de mesa existente');
      
        const createdTable = this.tableRepository.create(newTable); 
        await this.tableRepository.save(createdTable); 
      
        return 'Mesa agregada con éxito';
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
}



