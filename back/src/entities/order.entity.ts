import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  table: string;

  @Column({ type: 'enum', enum: ['Pendiente', 'En proceso', 'Completado'] })
  status: 'Pendiente' | 'En proceso' | 'Completado';

  // Relación muchos a uno con el usuario (mesero)
  @ManyToOne(() => User, (user) => user.orders, { nullable: true })
  waiter: User;

  // Relación uno a muchos con los elementos de la orden
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];
}
