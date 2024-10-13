import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { SubscriptionsService } from 'src/subscription/subscription.service';
import { Subscription } from 'src/subscription/subscription.entity';
import { SubscriptionController } from 'src/subscription/subscription.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: String(process.env.JWT_EXPIRES_IN_DAYS),
        },
      }),
    }),
  ],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
