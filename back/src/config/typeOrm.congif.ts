import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';


dotenvConfig();
const config = {
  type: 'postgres',
  host: (process.env.DB_HOST),
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  dropSchema: false,
  logging: true,
  entities: [__dirname, '**/*.entity.js'],
};

export default registerAs('typeOrm', () => config);

export const conectionSource = new DataSource(config as DataSourceOptions);
