import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RecoveryToken } from 'src/entities/recoveryToken.entity';

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
}
