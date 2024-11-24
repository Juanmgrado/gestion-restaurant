import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Order } from './order.entity';

export enum ITableState{
  free = 'free',
  ocupied = 'ocupied',
  reserved = 'reserved'
}

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false})
  tableNumber: number;

  @Column({ type: 'enum', enum: ITableState, default: ITableState.free })
  status: ITableState;

  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation[];

  @ManyToOne(() => Order, (order) => order.table)
  orders: Order[];

}
