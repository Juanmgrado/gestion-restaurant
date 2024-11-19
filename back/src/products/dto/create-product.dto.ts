import { IsString, IsNumber, IsOptional, MaxLength, Min, IsPositive, IsUrl, IsEnum } from 'class-validator';
import { Image } from 'src/entities/images.entity';

import { IProductCategory, IProductSubcategory } from 'src/entities/product.entity';

export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;
  
 
  images: Image[];

  @IsString()
  description:string

  @IsString()
  category: IProductCategory;

  @IsString()
  subcagtegory: IProductSubcategory
}
