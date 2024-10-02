import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(name: string, email: string, description: string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.description = description;
    user.password = password;
    user.avatar = 'test.jpg';
    user.deleted = false;
    await this.usersRepository.save(user);
    return user;
  }

  async update(user_id: number, fields: Partial<User>): Promise<null> {
    this.usersRepository.update({ id: user_id }, fields);
    return null;
  }
}
