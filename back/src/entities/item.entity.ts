// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
// import { Order } from './order.entity';
// import { Product } from './product.entity';
// import { OrdersItems } from './ordersItems.entity';

// @Entity('items')
// export class Item {
//   @PrimaryGeneratedColumn()
//   uuid: string;

//   @Column({nullable: false})
//   quantity: number;

//   @Column({nullable: false})
//   total: number;

//   @OneToMany(() => OrdersItems, (ordersitems) => ordersitems.items)
//   ordersItems: OrdersItems;

// }
