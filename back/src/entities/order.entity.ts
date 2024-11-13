// order.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
import { Table } from './table.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['Pendiente', 'En proceso', 'Completado'] })
  status: 'Pendiente' | 'En proceso' | 'Completado';

  // Relación con el mesero que toma la orden
  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  waiter: User;

  // Relación con los items de la orden
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  // Relación con la mesa en la que se toma la orden
  @ManyToOne(() => Table, (table) => table.orders, { nullable: true })
  table: Table;
}
