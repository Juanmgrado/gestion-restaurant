import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    try {
      return await this.productRepository.save(product);
    } catch (error) {
      throw new BadRequestException('Error al crear producto')
  }
}

async findAll(): Promise<Product[]> {
  return await this.productRepository.find();
}

async findOne(id: string): Promise<Product> {
  const product = await this.productRepository.findOne({ where: { id } });
  if (!product) {
    throw new NotFoundException(`Product with ID ${id} not found`);
  }
  return product;
}

async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
  
  const product = await this.productRepository.findOne({ where: { id } });
  
  if (!product) {
    throw new NotFoundException(`Product with ID ${id} not found`);
  }

  const updatedProduct = Object.assign(product, updateProductDto);

  return this.productRepository.save(updatedProduct);
}


async remove(id: string): Promise<string> {
  const product = await this.productRepository.findOne({ where: { id } });

  if (!product) {
    throw new NotFoundException(`Product with ID ${id} not found`);
  }

  await this.productRepository.remove(product);
  return `Product with id #${id} has been removed`;
}
   } 
