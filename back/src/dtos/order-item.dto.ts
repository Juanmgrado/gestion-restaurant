import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  readonly dish: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;
}
