import { IsString, IsNumber, IsOptional, MaxLength, Min, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  categoryId: string;
}
