import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicService } from 'src/topic/topic.service';
import { Topic } from 'src/topic/topic.entity';
import { Image } from 'src/image/image.entity';
import { TopicController } from 'src/topic/topic.controller';
import { ImageService } from 'src/image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, Image])],
  providers: [TopicService, ImageService],
  exports: [TopicService],
  controllers: [TopicController],
})
export class TopicModule {}
