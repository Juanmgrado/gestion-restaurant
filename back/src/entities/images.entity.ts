import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  url: string; 

  @ManyToOne(() => Product, (product) => product.images, { onDelete: 'CASCADE' })
  product: Product[];
}
