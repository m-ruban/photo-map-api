import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity({
  name: 'subscriptions',
})
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: Date;

  @Column()
  owner_user_id: number;

  @Column()
  subscribed_user_id: number;

  @ManyToOne(() => User, (user) => user.subscriptions)
  @JoinColumn({ name: 'owner_user_id' })
  owner: User;

  @ManyToOne(() => User, (user) => user.subscribers)
  @JoinColumn({ name: 'subscribed_user_id' })
  subscribedUser: User;
}
