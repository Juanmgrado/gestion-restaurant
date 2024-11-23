 import { Module } from '@nestjs/common';
 import { ProductsService } from './products.service';
 import { ProductsController } from './products.controller';
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { Product } from 'src/entities/product.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ImagesModule } from './image.module';

 @Module({
   imports: [TypeOrmModule.forFeature([Product,]),
   CloudinaryModule,ImagesModule],
   controllers: [ProductsController],
   providers: [ProductsService],
 })
 export class ProductsModule {}
