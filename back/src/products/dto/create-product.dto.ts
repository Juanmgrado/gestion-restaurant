import { IsString, IsNumber, IsOptional, MaxLength, Min, IsPositive, IsUrl, IsEnum } from 'class-validator';
import { IProductCategory, IProductSubcategory } from 'src/entities/product.entity';

export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;
  
  @IsUrl()
  image: string
  @IsString()
  description:string

  @IsString()
  category: IProductCategory;

  @IsString()
  subcagtegory: IProductSubcategory
}
