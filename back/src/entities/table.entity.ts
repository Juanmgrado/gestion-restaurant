import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Order } from './order.entity';

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  tableNumber: string;

  @Column({ type: 'enum', enum: ['libre', 'ocupada', 'reservada'] })
  status: 'libre' | 'ocupada' | 'reservada';

  // Relación con reservas, una mesa puede tener varias reservas en diferentes momentos
  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation[];

  // Relación con órdenes, una mesa puede tener múltiples órdenes mientras esté ocupada
  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];
}
