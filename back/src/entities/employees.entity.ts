import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Order } from "./order.entity";
import { Pedido } from "./pedidos";

export enum ICargo{
    chef = 'cheff',
    waitter = 'waitter',
    bartender = 'bartender'
}

@Entity('employees')
export class Employee{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, unique: true})
    numberID: number;

    @Column({nullable: false, type: 'enum', enum: ICargo})
    employeeCargo: ICargo

    @OneToOne(() => User, (user) =>  user.employee)
    user: User;

    @OneToMany(() => Order, (order) => order.employee)
    orders?: Order[];

    @OneToMany(()=> Pedido , (pedido) => pedido.mozo )
    pedidosMozo: Pedido[]
    
    @OneToMany(() => Pedido, (pedido) => pedido.chef)
    pedidosChef: Pedido[]
}