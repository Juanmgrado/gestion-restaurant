import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SalesData } from './sales-data.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  category: string; // Añadido como una propiedad para la categoría

  // Relación uno a muchos con SalesData para registrar ventas del producto
  @OneToMany(() => SalesData, (salesData) => salesData.product, { nullable: true })
  salesData: SalesData[];
}
