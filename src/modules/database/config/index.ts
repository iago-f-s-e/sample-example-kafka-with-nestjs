import { ConnectionOptions } from 'typeorm';
import { resolve } from 'path';

const dir = resolve(__dirname, '..');

const PATH_ENTITIES = `${dir}/entities/*.{ts,js}`;

export const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  database: 'sample_example',
  username: 'root',
  password: 'root',
  logging: ['error', 'warn'],
  synchronize: true,
  entities: [PATH_ENTITIES]
};
