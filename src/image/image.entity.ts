import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Topic } from 'src/topic/topic.entity';

@Entity({
  name: 'images',
})
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'origin_path' })
  originPath: string;

  @Column({ name: 'path_xs' })
  pathXS: string;

  @Column({ name: 'path_s' })
  pathS: string;

  @Column({ name: 'path_m' })
  pathM: string;

  @Column({ name: 'path_l' })
  pathL: string;

  @Column({ name: 'topic_id', nullable: true })
  topicId: number | null;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column()
  created_at: Date;

  @ManyToOne(() => Topic, (topic) => topic.images)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;
}
