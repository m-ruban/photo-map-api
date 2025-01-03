import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity({
  name: 'places',
})
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'geometry',
    srid: 4326,
  })
  point: string;

  @Column()
  created_at: Date;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.places)
  @JoinColumn({ name: 'user_id' })
  owner: User;
}
