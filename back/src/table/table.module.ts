import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from 'src/entities/table.entity';
import { Reservation } from 'src/entities/reservation.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Table, Reservation])
  ],
  controllers: [TableController],
  providers: [TableService]
})
export class TableModule {}
