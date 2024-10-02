import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity({
  name: 'recovery_tokens',
})
export class RecoveryToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  active: boolean;

  @Column()
  created_at: Date;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.recoveryTokens)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
