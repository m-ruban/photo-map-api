import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity({
  name: 'places',
})
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('point')
  point: {
    type: string;
    coordinates: number[];
  };

  @Column()
  created_at: Date;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.places)
  @JoinColumn({ name: 'user_id' })
  owner: User;
}
