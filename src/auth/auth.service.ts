import * as bcrypt from 'bcrypt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { extractTokenFromHeader } from 'src/auth/utils';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async signIn(email: string, enteredPassword: string): Promise<{ access_token: string }> {
    // find user
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    // check password
    const isMatch = await bcrypt.compare(enteredPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    // instead of the user object
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      description: user.description,
      createdAt: user.created_at,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async exit(request: Request): Promise<null> {
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    await this.cacheManager.set(token, 'dummy', Number(process.env.JWT_EXPIRES_IN));
    return null;
  }

  async createUser(name: string, email: string, description: string, enteredPassword: string): Promise<User> {
    // generate new hash for password
    const password = await bcrypt.hash(String(enteredPassword), Number(process.env.BCRYPT_SALT_OR_ROUND));
    return this.usersService.create(name, email, description, password);
  }
}
