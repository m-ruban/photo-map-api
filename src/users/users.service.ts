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

  async findOneById(userId: number): Promise<User | null> {
    return this.usersRepository.createQueryBuilder().where({ id: userId }).getOne();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder()
      .addSelect('"User"."password" AS "User_password"')
      .where({ email })
      .getOne();
  }

  async create(name: string, email: string, description: string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.description = description;
    user.password = password;
    user.deleted = false;
    return this.usersRepository.save(user);
  }

  async update(user_id: number, fields: Partial<User>): Promise<null> {
    this.usersRepository.update({ id: user_id }, fields);
    return null;
  }
}
