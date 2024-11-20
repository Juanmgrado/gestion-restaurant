import { Entity, Column, PrimaryGeneratedColumn,VersionColumn, ManyToOne} from 'typeorm';
import { Order } from './order.entity';
import { v4 as uuidv4 } from 'uuid';

export enum IProductCategory{
  mediterranean = 'mediterranean',
  sushi = 'sushi',
  grill = 'grill',
  entrance = 'entrance',
  dessert = 'dessert'
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false, unique: true})
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({nullable: false, type: 'enum', enum: IProductCategory})
  category: IProductCategory; 

  @Column({nullable: false})
  productDescription: string;

  @Column()
  stock: number;

  @VersionColumn()
  version: number;

  @ManyToOne(() => Order, (order) => order.products)
  order: Order;
}
