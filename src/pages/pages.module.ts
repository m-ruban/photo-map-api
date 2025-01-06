import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { TopicService } from 'src/topic/topic.service';
import { ImageService } from 'src/image/image.service';
import { SubscriptionsService } from 'src/subscription/subscription.service';
import { User } from 'src/users/user.entity';
import { Topic } from 'src/topic/topic.entity';
import { Image } from 'src/image/image.entity';
import { Subscription } from 'src/subscription/subscription.entity';
import { PagesController } from 'src/pages/pages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Topic, Image, Subscription])],
  providers: [UsersService, TopicService, ImageService, SubscriptionsService],
  exports: [],
  controllers: [PagesController],
})
export class PagesModule {}
