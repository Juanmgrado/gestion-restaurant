import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity('sales_data')
export class SalesData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  ventas: number;

  // Relación opcional muchos a uno con la entidad Product, si queremos desglosar las ventas por producto
  @ManyToOne(() => Product, { nullable: true })
  product: Product;
}
