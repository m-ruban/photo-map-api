import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Image } from 'src/image/image.entity';

@Entity({
  name: 'topics',
})
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  likes: number;

  @Column({ name: 'privated' })
  privated: boolean;

  @Column({
    type: 'geometry',
    srid: 4326,
  })
  point: string;

  @Column()
  address: string;

  @Column()
  deleted: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.topics)
  @JoinColumn({ name: 'user_id' })
  owner: User;

  @OneToMany(() => Image, (image) => image.topic)
  images: Image[];
}
