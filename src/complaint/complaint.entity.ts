import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Topic } from 'src/topic/topic.entity';
import { User } from 'src/users/user.entity';

@Entity({
  name: 'complaints',
})
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @Column()
  description: string;

  @Column()
  reviewed: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ name: 'topic_id', nullable: true })
  topicId: number;

  @ManyToOne(() => Topic, (topic) => topic.complaints)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @ManyToOne(() => User, (user) => user.complaints)
  @JoinColumn({ name: 'user_id' })
  owner: User;
}
