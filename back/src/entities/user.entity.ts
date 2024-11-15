import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Order } from './order.entity';
import { Reservation } from './reservation.entity';
import { Employee } from './employees.entity';
import { v4 as uuidv4 } from 'uuid';

export enum IRol{
  user = 'user',
  admin = 'admin',
  owner = 'owner'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true, })
  fullName: string;

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

  // Relación uno a muchos con la entidad Order
  @OneToMany(() => Reservation, (reservation) => reservation.user, { nullable: true })
  reservations: Reservation[];

  @OneToOne(() => Employee, (employee) => employee.user )
  employee: Employee;
}
