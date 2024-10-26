import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Subscription } from 'src/subscription/subscription.entity';

@Entity({
  name: 'notifications',
})
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  notification_key: string;

  @Column()
  detail: string;

  @Column()
  created_at: Date;

  @Column()
  subscription_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => Subscription, (subscription) => subscription.notifications)
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'user_id' })
  owner: User;
}
