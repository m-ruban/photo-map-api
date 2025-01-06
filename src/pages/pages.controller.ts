import { Controller, Get, UseGuards, Param, Request as NestRequest } from '@nestjs/common';
import { AuthGuard, RequestWithUser } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';
import { TopicService } from 'src/topic/topic.service';
import { SubscriptionsService } from 'src/subscription/subscription.service';

@Controller('pages')
export class PagesController {
  constructor(
    private userService: UsersService,
    private topicService: TopicService,
    private subscriptionsService: SubscriptionsService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('profile/:userId')
  async getPlaces(@Param() params: { userId: number }, @NestRequest() request: RequestWithUser) {
    const danas = new Date();
    const from = danas.toISOString().slice(0, 10);
    danas.setFullYear(danas.getFullYear() - 1);
    const to = danas.toISOString().slice(0, 10);
    const topics = await this.topicService.findAllByParams(from, to);
    const user = await this.userService.findOneById(params.userId, ['avatars', 'notifications']);
    const subscription = await this.subscriptionsService.findOne(request.user.id, params.userId);
    return {
      user,
      topics,
      subscriptionOnCurrentUser: subscription,
      title: `Профиль пользователя ${user?.name}`,
    };
  }

  @UseGuards(AuthGuard)
  @Get('map')
  async getMap(@NestRequest() request: RequestWithUser) {
    const userWithNotifications = await this.userService.findOneById(request.user.id, ['avatars', 'notifications']);
    return {
      user: userWithNotifications,
      title: `Photo map`,
      mapKey: 'test',
    };
  }
}
