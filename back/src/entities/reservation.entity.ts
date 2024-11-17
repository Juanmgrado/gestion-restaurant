import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Table } from './table.entity';
import { User } from './user.entity';


@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  uuid: string;

  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  date: Date;
  
  @Column({ type: 'timestamp' })
  startTime: Date;  

  @Column({ type: 'timestamp' })
  endTime: Date; 

  @Column({ type: 'int' })
  guests: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: Reservation;

  @ManyToOne(() => Table, (table) => table.reservations, { nullable: true })
  table: Table;

}
