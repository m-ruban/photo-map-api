import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from 'src/app.controller';
import { GlobalJwtModule } from 'src/jwt/jwt.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { RecoveryModule } from 'src/recovery/recovery.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { ProfileModule } from 'src/profile/profile.module';
import { DataBaseOptions } from 'src/configs/db.config';
import { RedisOptions } from 'src/configs/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(DataBaseOptions),
    GlobalJwtModule,
    CacheModule.registerAsync(RedisOptions),
    AuthModule,
    RecoveryModule,
    UsersModule,
    ProfileModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
