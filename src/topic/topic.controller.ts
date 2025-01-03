import { Controller, Get, UseGuards, Body, Param, Post, Request as NestRequest, Delete } from '@nestjs/common';
import { TopicService } from 'src/topic/topic.service';
import { AuthGuard, RequestWithUser } from 'src/auth/auth.guard';

interface RequestCreateTopic {
  description: string;
  privated: boolean;
  lat: number;
  long: number;
  address: string;
  images: number[];
}

@Controller('topics')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @UseGuards(AuthGuard)
  @Get('/:userId')
  getTopics(@Param() params: { userId: number }) {
    return this.topicService.findAllByUser(params.userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  createTopic(@Body() requestDto: RequestCreateTopic, @NestRequest() request: RequestWithUser) {
    return this.topicService.create(
      requestDto.description,
      requestDto.privated,
      requestDto.lat,
      requestDto.long,
      requestDto.address,
      requestDto.images,
      request.user.id,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/:topicId')
  deleteTopic(@Param() params: { topicId: number }, @NestRequest() request: RequestWithUser) {
    return this.topicService.delete(request.user.id, params.topicId);
  }
}
