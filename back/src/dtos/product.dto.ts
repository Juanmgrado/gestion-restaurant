import { IsString, IsNumber, IsNotEmpty, IsEnum, IsUrl, } from 'class-validator';
import { Image } from 'src/entities/images.entity';
import { IProductCategory, IProductSubcategory } from 'src/entities/product.entity';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
  
  @IsString()
  @IsNotEmpty()
  readonly description: string 

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsNotEmpty()
  @IsEnum(IProductCategory)
  readonly category: IProductCategory

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  readonly images: Image[];

  @IsNotEmpty()
  @IsEnum(IProductSubcategory)
  readonly subcategory: IProductSubcategory;

}
