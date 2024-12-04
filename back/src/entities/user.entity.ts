import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Order } from './order.entity';
import { Reservation } from './reservation.entity';
import { Employee } from './employees.entity';
import { Payment } from './payment.entity';

export enum IRol{
  user = 'user',
  camarero = 'camarero',
  cheff = 'cheff'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', nullable: false, })
  fullname: string;

  @Column({unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;
    
  @Column({ type: 'varchar', length: 255 , nullable: false})
  password: string;
 
  @Column({ type: 'enum', enum: IRol, default: IRol.user})
  rol: IRol;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false})
  banned: boolean;

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: []
  
  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @OneToOne(() => Employee, (employee) => employee.user )
  employee: Employee;
}
