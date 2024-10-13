import { Controller, Post, Get, UseGuards, Request as NestRequest, Param, Delete } from '@nestjs/common';
import { SubscriptionsService } from 'src/subscription/subscription.service';
import { AuthGuard, RequestWithUser } from 'src/auth/auth.guard';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @UseGuards(AuthGuard)
  @Get('/:userId')
  getSubscription(@Param() params: { userId: number }, @NestRequest() request: RequestWithUser) {
    return this.subscriptionsService.findOne(request.user.id, params.userId);
  }

  @UseGuards(AuthGuard)
  @Post('/:userId')
  createSubscription(@Param() params: { userId: number }, @NestRequest() request: RequestWithUser) {
    return this.subscriptionsService.create(request.user.id, params.userId);
  }

  @UseGuards(AuthGuard)
  @Delete('/:subscriptionId')
  deleteSubscription(@Param() params: { subscriptionId: number }, @NestRequest() request: RequestWithUser) {
    return this.subscriptionsService.delete(request.user.id, params.subscriptionId);
  }
}
