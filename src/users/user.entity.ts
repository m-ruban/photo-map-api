import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RecoveryToken } from 'src/recovery/recoveryToken.entity';
import { Subscription } from 'src/subscription/subscription.entity';
import { Notification } from 'src/notification/notification.entity';
import { Place } from 'src/place/place.entity';
import { Topic } from 'src/topic/topic.entity';
import { Complaint } from 'src/complaint/complaint.entity';
import { Image } from 'src/image/image.entity';

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

  @Column({ select: false })
  password: string;

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

  @OneToMany(() => Place, (place) => place.owner)
  places: Place[];

  @OneToMany(() => Topic, (topic) => topic.owner)
  topics: Topic[];

  @OneToMany(() => Image, (image) => image.owner)
  avatars: Image[];

  @OneToMany(() => Complaint, (complaint) => complaint.owner)
  complaints: Complaint[];
}
