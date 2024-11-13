import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmCongif from './config/typeOrm.congif';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
