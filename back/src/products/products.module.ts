 import { Module } from '@nestjs/common';
 import { ProductsService } from './products.service';
 import { ProductsController } from './products.controller';
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { Product } from 'src/entities/product.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Image } from 'src/entities/images.entity';
// import { ImagesModule } from './image.module';

 @Module({
   imports: [TypeOrmModule.forFeature([Product, Image]),
   CloudinaryModule],
   controllers: [ProductsController],
   providers: [ProductsService],
 })
 export class ProductsModule {}
