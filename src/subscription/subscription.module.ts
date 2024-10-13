import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsService } from 'src/subscription/subscription.service';
import { Subscription } from 'src/subscription/subscription.entity';
import { SubscriptionController } from 'src/subscription/subscription.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
