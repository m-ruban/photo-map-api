import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecoveryToken } from 'src/entities/recoveryToken.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RecoveryService {
  constructor(
    @InjectRepository(RecoveryToken)
    private recoveryTokensRepository: Repository<RecoveryToken>,
    private usersService: UsersService,
  ) {}

  async findOne(token: string): Promise<RecoveryToken | null> {
    return this.recoveryTokensRepository.findOne({
      where: { token },
      relations: ['user'],
    });
  }

  async updatePassword(recoverToken: string, enteredPassword: string): Promise<null> {
    // find token
    const tokenEntity = await this.findOne(recoverToken);
    if (!tokenEntity) {
      throw new UnauthorizedException();
    }
    // generate new hash for password
    const password = await bcrypt.hash(String(enteredPassword), Number(process.env.BCRYPT_SALT_OR_ROUND));
    return this.usersService.update(tokenEntity.user.id, { password });
  }

  async sendRevoverToken(email: string): Promise<{ recover_link: string }> {
    // find user
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    // create token
    const token = await bcrypt.hash(String(user.id), Number(process.env.BCRYPT_SALT_OR_ROUND));
    const tokenEntity = this.recoveryTokensRepository.create({
      token,
      active: true,
      user_id: user.id,
    });
    await this.recoveryTokensRepository.insert(tokenEntity);
    // TODO send link to user mail
    const link = '/recovery/change-password/?recover_token=' + tokenEntity.token;
    return {
      recover_link: link,
    };
  }
}
