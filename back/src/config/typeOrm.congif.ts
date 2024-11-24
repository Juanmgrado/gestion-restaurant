import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
const config = {
  type: 'postgres',
  host: parseInt(process.env.DB_HOST),
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  databaseName: process.env.DB_NAME,
  synchronize: true,
  dropSchema: true,
  logging: true,
  entities: [__dirname, '**/*.entity.js'],
};

export default registerAs('typeOrm', () => config,);

export const conectionSource = new DataSource(config as DataSourceOptions);
