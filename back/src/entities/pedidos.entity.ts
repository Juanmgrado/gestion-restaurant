import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Employee } from './employees.entity';
import { Table } from './table.entity';
  
  @Entity('pedidos')
  export class Pedido {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    productoId: string;
  
    @Column({ type: 'int' })
    cantidad: number;
    
  
    @Column({ type: 'text', nullable: true })
    notasAdicionales: string;
  
    @Column({ type: 'enum', enum: ['pendiente', 'en_proceso', 'completado'], default: 'pendiente' })
    estado: 'pendiente' | 'en_proceso' | 'completado';
  
    @ManyToOne(() => Employee, (employee) => employee.pedidosMozo, { nullable: true })
    mozo: Employee;
  
    @ManyToOne(() => Employee, (employee) => employee.pedidosChef, { nullable: true })
    chef: Employee;
  
    @Column({ default: true })
    activo: boolean;
  
    @CreateDateColumn()
    creadoEn: Date;
  
    @UpdateDateColumn()
    actualizadoEn: Date;

    @ManyToOne(() => Table, (table) => table.pedido)
    table: Table;
  }
  