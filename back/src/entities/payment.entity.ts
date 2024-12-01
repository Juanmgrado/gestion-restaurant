import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { Reservation } from './reservation.entity';
  import { User } from './user.entity';
  
  
  @Entity('payments')
  export class Payment {
    @ApiProperty({
      example: 'e5bdda8e-3da4-4a5f-b9ea-6239c73222f4',
      description: 'UUID del pago',
    })
    @PrimaryColumn()
    id: string;
    
    @ApiProperty({ example: '2024-05-08', description: 'fecha en la que se realizó el pago' })
    @Column({ type: 'timestamp', default: () => 'current_timestamp' })
    date: Date;
  
    @ApiProperty({ example: 'USD', description: 'Moneda en la cual se hizo el pago' })
    @ApiProperty({
      example: '2024-09-20T15:00:00Z',
      description: 'Fecha del pago',
    })
    @Column({nullable: true})
    currency: string;
  
    @ApiProperty({ example: 'locolindo@paypal.com', description: 'Email de la cuenta con la que se realizó el pago' })
    @Column({nullable: true})
    payerEmail: string;
  
    @ApiProperty({ example: 'locolindo@paypal.com', description: 'Id de la cuenta con la que el pagador realizó el pago' })
    @Column({nullable: true})
    payerId: string
  
    @ApiProperty({
      example: 'pending',
      description: 'Estado del pago',
    })
    @Column( {default:'pendding'} )
    status: string;
  
    @ApiProperty({
      example: 100.00,
      description: 'Total del pago realizado',
  })
    @Column('decimal', {nullable: true, precision: 10, scale: 2 })
    total: number;
  
    @OneToOne(()=> Reservation, (reservation) => reservation.payment)
    @JoinColumn()
    reservation: Reservation
  
    @ManyToOne(()=> User, (user)=> user.payments)
    @JoinColumn()
    user: User
  }
  