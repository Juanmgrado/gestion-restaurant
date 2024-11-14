import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ unique: true, nullable: false })
    email: string;
    
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: ['mesero', 'cocinero', 'admin', 'cliente'] })
  role: 'mesero' | 'cocinero' | 'admin' | 'cliente';

  // Relación uno a muchos con la entidad Order
  @OneToMany(() => Order, (order) => order.waiter, { nullable: true })
  orders: Order[];
}
