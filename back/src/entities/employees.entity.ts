import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Order } from "./order.entity";

export enum ICargo{
    chef = 'cheff',
    waitter = 'waitter',
    bartender = 'bartender'
}

@Entity('employees')
export class Employee{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({nullable: false, unique: true})
    numberID: number;

    @Column({nullable: false, type: 'enum', enum: ICargo})
    employeeCargo: ICargo

    @OneToOne(() => User, (user) =>  user.employee)
    user: User;

    @OneToMany(() => Order, (order) => order.employee)
    orders?: Order[];
}