import { Controller, Get, UseGuards, Request as NestRequest, Param, Delete } from '@nestjs/common';
import { NotificationsService } from 'src/notification/notification.service';
import { AuthGuard, RequestWithUser } from 'src/auth/auth.guard';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationsService: NotificationsService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  getNotifications(@NestRequest() request: RequestWithUser) {
    return this.notificationsService.findAllByUser(request.user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:noticeId')
  deleteNotification(@Param() params: { noticeId: number }, @NestRequest() request: RequestWithUser) {
    return this.notificationsService.delete(request.user.id, params.noticeId);
  }
}
