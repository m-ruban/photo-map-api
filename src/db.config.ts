import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

export const DataBaseOptions: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: false,
    logging: true,
    entities: [User],
  }),
};