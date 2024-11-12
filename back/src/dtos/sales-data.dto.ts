import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateSalesDataDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly sales: number;
}
