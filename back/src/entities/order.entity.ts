import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Table } from './table.entity';
import { Employee } from './employees.entity';
import { Product } from './product.entity';

export enum IOrderStatus{
  pending = 'pending',
  inProgress = 'in progress',
  completed = 'completed'
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  uuiid: string;

  @Column({ type: 'enum', enum: IOrderStatus, default: IOrderStatus.inProgress })
  status:IOrderStatus;

  @Column({type: 'timestamp', default: ()=> 'now()'})
  date: Date;

  @Column({nullable: false})
  quantity: number;

  @Column({nullable: false})
  total: number;

  @Column({default: false})
  isActive: boolean;
  
  @OneToMany(() => Employee, (employee) => employee.orders, { nullable: false })
  employee: Employee;

  @OneToMany(() => Table, (table) => table.orders, { nullable: true })
  table: Table;

  @OneToMany(() => Product, (products) => products.order)
  products: Product[]

}
