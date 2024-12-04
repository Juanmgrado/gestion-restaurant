import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Order } from './order.entity';
import { Pedido } from './pedidos.entity';


@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false})
  tableNumber: number;

  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation[];

  @ManyToOne(() => Pedido, (pedido) => pedido.table)
  pedido: Pedido[];

}
