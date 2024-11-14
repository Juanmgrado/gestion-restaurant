// import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Order } from "./order.entity";
// import { Product } from "./product.entity";

// @Entity('ordersProducts')
// export class OrdersProducts{
    
//     @PrimaryGeneratedColumn()
//     uuid: string;

//     @Column()
//     quantity: number;

//     @Column()
//     total: number;
    
//     @ManyToOne(() => Order, (order) => order.orderProducts)
//     order: Order;

//     @ManyToOne(() => Product, (product) => product.ordersProducts)
//     product: Product
// }