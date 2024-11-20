import { Entity, Column, PrimaryGeneratedColumn, VersionColumn, ManyToOne, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { Image } from './images.entity';

export enum IProductCategory {
  PlatosPrincipales = 'Platos Principales',
  Pasteleria = 'Pasteleria',
  Postres = 'Postres',
  Tragos = 'Tragos',
}

export enum IProductSubcategory {
  Mediterranea = 'Mediterranea',
  Oriental = 'Oriental',
  Occidental = 'Occidental',
  LatinoAmericano = 'LatinoAmericano',
  Indio = 'Indio',
  Tropical = 'Tropical',
  Bebidas = 'Bebidas'
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: false, type: 'enum', enum: IProductCategory })
  category: IProductCategory;

  @Column({ nullable: false, type: 'enum', enum: IProductSubcategory })
  subcategory: IProductSubcategory;

  @Column({ nullable: false })
  description: string;
  
  @OneToMany(() => Image, (image) => image.product, { cascade: true })
  images: Image[];

  @ManyToOne(() => Order, (order) => order.products)
  order: Order;
}
