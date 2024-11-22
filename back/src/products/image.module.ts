import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities/images.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Image])],  
  exports: [TypeOrmModule.forFeature([Image])], 
})
export class ImagesModule {}
