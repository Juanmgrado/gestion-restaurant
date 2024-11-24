import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
const config = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  dropSchema: true,
  logging: true,
  entities: [__dirname, '**/*.entity.js'],
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

export default registerAs('typeOrm', () => config,);

export const conectionSource = new DataSource(config as DataSourceOptions);
