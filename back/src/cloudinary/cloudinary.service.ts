import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {

    async upLoadImg(file: Express.Multer.File): Promise<string> {
        
        try {

          const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
          if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new InternalServerErrorException('Tipo de archivo no permitido. Solo imágenes JPEG, PNG y GIF.');
          }
    
          const maxFileSize = 5 * 1024 * 1024; 
          if (file.size > maxFileSize) {
            throw new InternalServerErrorException('El archivo excede el tamaño máximo permitido de 5 MB.');
          }
    
          const result = await new Promise<any>((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (error) {
                  return reject(error);
                }
                resolve(result);
              },
            );
    
            const fileStream = Readable.from(file.buffer);
            fileStream.pipe(upload);
          });
    
          return result.secure_url;
    
        } catch (error) {
          throw new InternalServerErrorException(`Error al cargar la imagen: ${error.message}`);
        }
      }
}
