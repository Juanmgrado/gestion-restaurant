import { IsString, IsArray, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export enum OrderStatus {
  PENDIENTE = 'Pendiente',
  EN_PROCESO = 'En proceso',
  COMPLETADO = 'Completado',
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly table: string;

  @IsArray()
  @IsNotEmpty()
  readonly items: OrderItemDto[];

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  readonly status: OrderStatus;
}
