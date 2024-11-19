import {
    BadRequestException,
    Injectable,
    NotFoundException,
    OnModuleInit,
  } from '@nestjs/common';
  import { CreateProductDto } from './dto/create-product.dto';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Product } from 'src/entities/product.entity';
  import { Repository } from 'typeorm';
  import { UpdateProductDto } from './dto/update-product.dto';
  import * as fs from 'fs';
import { Image } from 'src/entities/images.entity';

  
  @Injectable()
  export class ProductsService implements OnModuleInit {
    constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
    ) {}
  
    
    async onModuleInit() {
      await this.loadProducts();
    }
  
   
    private async loadProducts(): Promise<void> {
      try {
        const data = fs.readFileSync('product.json', 'utf8'); 
        const products: CreateProductDto[] = JSON.parse(data);
  
        for (const product of products) {
          const existingProduct = await this.productRepository.findOne({
            where: { name: product.name },
          });
  
          if (!existingProduct) {
            const newProduct = this.productRepository.create(product);
            await this.productRepository.save(newProduct);
          }
        }
        console.log('Productos precargados correctamente.');
      } catch (error) {
        console.error('Error al cargar productos desde el archivo JSON:', error);
      }
    }
    async create(createProductDto: CreateProductDto): Promise<Product> {
        
        const images = createProductDto.images.map((url) => {
          const image = new Image();  
          image.url= image.url
          return image;
        });
      
        
        const product = this.productRepository.create({
          ...createProductDto,
          images,  
        });
      
        try {
          return await this.productRepository.save(product);  
        } catch (error) {
          throw new BadRequestException('Error al crear producto');
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
  