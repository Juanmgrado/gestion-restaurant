import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmCongif from './config/typeOrm.congif';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
// import { ProductsModule } from './products/products.module';
import { TableModule } from './table/table.module';
import { ReservationsModule } from './reservations/reservations.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [typeOrmCongif],
      }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          configService.get('typeOrm'),
      }),
      UsersModule,
      AuthModule,
      ProductsModule,
      TableModule,
      ReservationsModule,
      NodemailerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
