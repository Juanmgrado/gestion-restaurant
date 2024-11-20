import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {

  async upLoadImgs(files: Express.Multer.File | Express.Multer.File[]): Promise<string[]> {
    try {
     
      if (!Array.isArray(files)) {
        files = [files];
      }
  
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxFileSize = 5 * 1024 * 1024; 
  
      for (const file of files) {
        if (!allowedMimeTypes.includes(file.mimetype)) {
          throw new InternalServerErrorException(`Tipo de archivo no permitido (${file.originalname}). Solo imágenes JPEG, PNG y GIF.`);
        }
        if (file.size > maxFileSize) {
          throw new InternalServerErrorException(`El archivo ${file.originalname} excede el tamaño máximo permitido de 5 MB.`);
        }
      }
  
    
      const uploadPromises = files.map(file =>
        new Promise<string>((resolve, reject) => {
          const upload = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result.secure_url);
            },
          );
  
          const fileStream = Readable.from(file.buffer);
          fileStream.pipe(upload);
        })
      );
  
      const results = await Promise.all(uploadPromises);
      return results; 
    } catch (error) {
      throw new InternalServerErrorException(`Error al cargar las imágenes: ${error.message}`);
    }
  }
  
}
