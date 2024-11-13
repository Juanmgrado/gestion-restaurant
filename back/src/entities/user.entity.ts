import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: ['mesero', 'cocinero', 'admin', 'cliente'] })
  role: 'mesero' | 'cocinero' | 'admin' | 'cliente';

  // Relación uno a muchos con la entidad Order
  @OneToMany(() => Order, (order) => order.waiter, { nullable: true })
  orders: Order[];
}
