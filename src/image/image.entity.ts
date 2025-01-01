import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  topicId: number;

  @Column()
  created_at: Date;
}
