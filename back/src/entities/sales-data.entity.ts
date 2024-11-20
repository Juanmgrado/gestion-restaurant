import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('sales_data')
export class SalesData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: 'now()' })
  name: string;

  @Column()
  sellingTotal: number;


}
