import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from 'src/subscription/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  async findOne(owner: number, subscribedUser: number): Promise<Subscription | null> {
    return this.subscriptionsRepository.findOneBy({ owner_user_id: owner, subscribed_user_id: subscribedUser });
  }

  async create(owner: number, subscribedUser: number): Promise<Subscription> {
    const subscription = new Subscription();
    subscription.owner_user_id = owner;
    subscription.subscribed_user_id = subscribedUser;
    await this.subscriptionsRepository.save(subscription);
    return subscription;
  }

  async delete(owner: number, subscriptionId: number): Promise<null> {
    const subscription = await this.subscriptionsRepository.findOneBy({ id: subscriptionId });
    if (!subscription) {
      throw new BadRequestException();
    }
    if (subscription.owner_user_id !== owner) {
      throw new UnauthorizedException();
    }
    await this.subscriptionsRepository.delete({ id: subscriptionId });
    return null;
  }
}
