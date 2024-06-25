import { Injectable } from '@nestjs/common';

export interface User {
  userId: number;
  username: string;
  password: string;
  hash: string;
  test: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      hash: '$2b$05$VpK81HxP6LxAGmm6cHBRaOJ.XuEVAPOaNC8ns9R3qPTTEGVfNApNO',
      test: '1',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      hash: '$2b$05$ovgMU8K0nKN5hnZfe6lS1OXsYxSWHr0F4x83v3NvWulTU3to.HhsC',
      test: '2',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
