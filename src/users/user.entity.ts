import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RecoveryToken } from 'src/recovery/recoveryToken.entity';
import { Subscription } from 'src/subscription/subscription.entity';
import { Notification } from 'src/notification/notification.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  deleted: boolean;

  @Column()
  created_at: Date;

  @OneToMany(() => RecoveryToken, (recoveryToken) => recoveryToken.user)
  recoveryTokens: RecoveryToken[];

  @OneToMany(() => Subscription, (subscription) => subscription.owner)
  subscriptions: Subscription[]; // подписки пользователя

  @OneToMany(() => Subscription, (subscription) => subscription.subscribedUser)
  subscribers: Subscription[]; // подписчики пользователя

  @OneToMany(() => Notification, (notification) => notification.owner)
  notifications: Notification[];
}
