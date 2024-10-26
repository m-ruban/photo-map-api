import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from 'src/notification/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async findAllByUser(user_id: number): Promise<Notification[]> {
    return await this.notificationsRepository.findBy({ user_id });
  }

  async create(
    notification_key: string,
    detail: string,
    subscription_id: number,
    user_id: number,
  ): Promise<Notification> {
    const notification = new Notification();
    notification.notification_key = notification_key;
    notification.detail = detail;
    notification.subscription_id = subscription_id;
    notification.user_id = user_id;
    await this.notificationsRepository.save(notification);
    return notification;
  }

  async delete(owner: number, noticeId: number): Promise<null> {
    const notification = await this.notificationsRepository.findOneBy({ id: noticeId });
    if (!notification) {
      throw new BadRequestException();
    }
    if (notification.user_id !== owner) {
      throw new UnauthorizedException();
    }
    await this.notificationsRepository.delete({ id: noticeId });
    return null;
  }
}
