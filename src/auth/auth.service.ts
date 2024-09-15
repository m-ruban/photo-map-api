import * as bcrypt from 'bcrypt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { RecoveryTokensService } from 'src/recoveryTokens/recoveryTokens.service';
import { extractTokenFromHeader } from 'src/auth/utils';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private recoveryTokensService: RecoveryTokensService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async signIn(
    email: string,
    enteredPassword: string,
  ): Promise<{ access_token: string }> {
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
      avatar: user.avatar,
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
    await this.cacheManager.set(
      token,
      'dummy',
      Number(process.env.JWT_EXPIRES_IN),
    );
    return null;
  }

  async sendRevoverToken(email: string): Promise<{ recover_link: string }> {
    // find user
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    // create token
    const tokenEntity = await this.recoveryTokensService.createToken(user.id);
    // TODO send link to user mail
    const link = '/auth/change-password/?recover_token=' + tokenEntity.token;
    return {
      recover_link: link,
    };
  }

  async updatePassword(
    recoverToken: string,
    enteredPassword: string,
  ): Promise<null> {
    // find token
    const tokenEntity = await this.recoveryTokensService.findOne(recoverToken);
    if (!tokenEntity) {
      throw new UnauthorizedException();
    }
    // generate new hash for password
    const password = await bcrypt.hash(
      String(enteredPassword),
      Number(process.env.BCRYPT_SALT_OR_ROUND),
    );
    return this.usersService.updatePassword(tokenEntity.user.id, password);
  }

  async createUser(
    name: string,
    email: string,
    description: string,
    enteredPassword: string,
  ): Promise<User> {
    // generate new hash for password
    const password = await bcrypt.hash(
      String(enteredPassword),
      Number(process.env.BCRYPT_SALT_OR_ROUND),
    );
    return this.usersService.create(name, email, description, password);
  }
}
