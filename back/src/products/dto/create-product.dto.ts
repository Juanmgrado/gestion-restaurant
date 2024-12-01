import { IsString, IsNumber, IsOptional, MaxLength, Min, IsPositive, IsUrl, IsEnum, IsArray } from 'class-validator';
import { Image } from 'src/entities/images.entity';

import { IProductCategory, IProductSubcategory } from 'src/entities/product.entity';

export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;
  
 
  @IsArray()
  images: Image[];
  
  @IsString()
  description:string

  @IsString()
  category: IProductCategory;
  
  @IsString()
  duration: string

  @IsString()
  subcategory: IProductSubcategory
}
