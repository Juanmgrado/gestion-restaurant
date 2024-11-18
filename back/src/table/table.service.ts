import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTableDto } from 'src/dtos/addTable.dto';
import { Table } from 'src/entities/table.entity';
import { Repository } from 'typeorm';
import * as data from '../../data.json'

@Injectable()
export class TableService {
    constructor(
        @InjectRepository(Table)
        private readonly tableRepository: Repository <Table>
    ){}

    async tableSeeder(){
        

        data?.map(async table => {
            
            await this.tableRepository.
            createQueryBuilder()
            .insert()
            .into(Table)
            .values({
                uuid: table.uuid,
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
}
