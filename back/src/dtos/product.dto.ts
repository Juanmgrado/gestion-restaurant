import { IsString, IsNumber, IsNotEmpty, IsEnum, IsUrl, } from 'class-validator';
import { IProductCategory, IProductSubcategory } from 'src/entities/product.entity';

export class CreateProductDto {
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
  readonly image: string;

  @IsNotEmpty()
  @IsEnum(IProductSubcategory)
  readonly subcategory: IProductSubcategory;

}
