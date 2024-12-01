import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmCongif from './config/typeOrm.congif';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TableModule } from './table/table.module';
import { ReservationsModule } from './reservations/reservations.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';

import { ProductsModule } from './products/products.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { clodinaryConfig } from './config/cloudinary.config';
import { PedidoModule } from './pedidos/pedidos.module';
import { PaymentModule } from './payment/payment.module';
import { PayPalModule } from './payypal/payypal.module';



@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [typeOrmCongif, clodinaryConfig],
      }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          configService.get('typeOrm'),
      }),
      UsersModule,
      AuthModule,

      ProductsModule,
      PedidoModule,
      TableModule,
      ReservationsModule,
      NodemailerModule,
      CloudinaryModule,
      PaymentModule,
      PayPalModule
      /* PaypalModule, */

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
