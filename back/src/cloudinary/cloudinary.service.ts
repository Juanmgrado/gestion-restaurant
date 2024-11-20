
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async upLoadImg(file: Express.Multer.File): Promise<string> {
    try {
     //te saque las validaciones, no me dejaba subir las imagenes
      const result = await new Promise<any>((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );

        const fileStream = Readable.from(file.buffer);
        fileStream.pipe(upload);
      });

    
      return result.secure_url;
    } catch (error) {
      throw new InternalServerErrorException(`Error al cargar la imagen: ${error.message}`);
    }
  }
  async uploadImageFromUrl(imageUrl: string): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(imageUrl, {
        resource_type: 'auto', 
      });

      return result.secure_url; 
    } catch (error) {
      throw new Error(`Error al subir la imagen: ${error.message}`);
    }
  }
}
