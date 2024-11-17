import { IsEnum, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTableDto {
  @IsInt()
  @IsNotEmpty()
  tableNumber: number; 

}
