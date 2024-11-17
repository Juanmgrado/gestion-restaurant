import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  url: string; 

  @Column({ nullable: true })
  caption: string; //pie de foto para el que le cueste un toque

  @Column({ nullable: true })
  alto: number;

  @Column({ nullable: true })
  height: number; 

  @Column({ nullable: true })
  type: string; 

  @ManyToOne(() => Product, (product) => product.images, { onDelete: 'CASCADE' })
  product: Product; 
}
