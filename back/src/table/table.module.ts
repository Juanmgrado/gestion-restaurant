import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from 'src/entities/table.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Table])
  ],
  controllers: [TableController],
  providers: [TableService]
})
export class TableModule {}
