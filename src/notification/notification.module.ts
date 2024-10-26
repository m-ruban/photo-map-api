import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from 'src/notification/notification.service';
import { Notification } from 'src/notification/notification.entity';
import { NotificationController } from 'src/notification/notification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [NotificationsService],
  exports: [NotificationsService],
  controllers: [NotificationController],
})
export class NotificationModule {}
