import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar la validación global
  app.useGlobalPipes(new ValidationPipe());
  
  // app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
  .setTitle('API de restaurante')
  .setDescription('Documentación de la API para gestionar el sistema de reservas y administración del restaurante.')
  .setVersion('1.0')
  .addTag('productos')
  .addTag('auth')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
  });

  await app.listen(3001);
}

bootstrap();
