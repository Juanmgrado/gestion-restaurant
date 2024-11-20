
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
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

  
  @Injectable()
  export class ProductsService implements OnModuleInit {
    constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
      private readonly cloudinaryService: CloudinaryService,
      @InjectRepository(Image)
      private readonly imageRepository: Repository<Image>,
    ) {}
  
    
    async onModuleInit() {
      await this.loadProducts();
    }
  
    async loadProducts(): Promise<void> {
      try {
        const data = fs.readFileSync('product.json', 'utf8');
        const products: CreateProductDto[] = JSON.parse(data);
    
        for (const product of products) {
          const existingProduct = await this.productRepository.findOne({
            where: { name: product.name },
          });
    
          if (!existingProduct) {
            let images = Array.isArray(product.images) ? product.images : [];
    
            if (images.length > 0) {
              images = await Promise.all(
                images.map(async (url) => {
                  if (typeof url === 'string') {
                    // Verificar si la URL ya existe en la base de datos
                    const existingImage = await this.imageRepository.findOne({
                      where: { url },
                    });
    
                    if (existingImage) {
                      // Si la imagen ya existe, reutilizamos la URL
                      return existingImage;
                    } else {
                      // Si la imagen no existe, la subimos a Cloudinary
                      const imageUrl = await this.cloudinaryService.uploadImageFromUrl(url);
                      const newImage = new Image();
                      newImage.url = imageUrl;
                      return newImage;
                    }
                  }
                  throw new Error('URL de imagen inválida');
                })
              );
            }
    
            const newProduct = this.productRepository.create({
              ...product,
              images,
            });
    
            await this.productRepository.save(newProduct);
          }
        }
        console.log('Productos precargados correctamente.');
      } catch (error) {
        console.error('Error al cargar productos desde el archivo JSON:', error);
      }
    }
    
    
    async create(createProductDto: CreateProductDto): Promise<Product> {
      try {
        const uploadedImages = await Promise.all(
          createProductDto.images.map((image: Image) => this.cloudinaryService.upLoadImg(images.url))  
        );
    
        
        const images = uploadedImages.map((url) => {
          const image = new Image();
          image.url = url;
          return image;
        });
    
       
        const product = this.productRepository.create({
          ...createProductDto,
          images,  
        });
    
      
        return await this.productRepository.save(product);
      } catch (error) {
        throw new BadRequestException('Error al crear producto');
      }
    }
    

  
    async findAll(): Promise<Product[]> {
      return await this.productRepository.find({
        relations: ['images'], 
      });
    }
    
    async findOne(id: string): Promise<Product> {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['images'],  
      });
    
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
  

