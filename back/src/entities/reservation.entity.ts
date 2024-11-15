import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Table } from './table.entity';
import { User } from './user.entity';


@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({type: 'timestamp', default: ()=> 'now()'})
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
