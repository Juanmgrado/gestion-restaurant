import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Table } from './table.entity';
import { User } from './user.entity';
import { Payment } from './payment.entity';

export enum IStatus{
  pending = 'pending',
  active = 'active',
  canceled = 'canceled'
}

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  date: Date;
  
  @Column()
  day: Date;
  
  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'int' })
  guests: number;

  @Column()
  tableNumber: number;

  @Column({nullable: false, default: 10.5, type: 'decimal', scale:2})
  reservationWorth: number;

  @Column({type: 'enum', enum: IStatus, default: IStatus.pending})
  status: IStatus;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Payment, (payment) => payment.reservation)
  payment: Payment
  
  @ManyToOne(() => Table, (table) => table.reservations, { nullable: true })
  table: Table;
}
