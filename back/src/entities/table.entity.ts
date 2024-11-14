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
  @PrimaryGeneratedColumn()
  uuid: string;

  @Column({ nullable: false})
  tableNumber: number;

  @Column({ type: 'enum', enum: ITableState, default: ITableState.free })
  status: ITableState;

  // Relación con reservas, una mesa puede tener varias reservas en diferentes momentos
  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation[];

  // Relación con órdenes, una mesa puede tener múltiples órdenes mientras esté ocupada
  @ManyToOne(() => Order, (order) => order.table)
  orders: Order[];
}
