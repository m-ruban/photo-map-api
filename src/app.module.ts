import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from 'src/app.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { RecoveryModule } from 'src/recovery/recovery.module';
import { ProfileModule } from 'src/profile/profile.module';
import { DataBaseOptions } from 'src/db.config';
import { RedisOptions } from 'src/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(DataBaseOptions),
    CacheModule.registerAsync(RedisOptions),
    AuthModule,
    RecoveryModule,
    UsersModule,
    ProfileModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
