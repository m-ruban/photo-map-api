import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecoveryToken } from 'src/entities/recoveryToken.entity';

@Injectable()
export class RecoveryTokensService {
  constructor(
    @InjectRepository(RecoveryToken)
    private recoveryTokensRepository: Repository<RecoveryToken>,
  ) {}

  async findOne(token: string): Promise<RecoveryToken | null> {
    return this.recoveryTokensRepository.findOne({
      where: { token },
      relations: ['user'],
    });
  }

  async createToken(user_id: number): Promise<RecoveryToken> {
    const token = await bcrypt.hash(
      String(user_id),
      Number(process.env.BCRYPT_SALT_OR_ROUND),
    );
    const recoveryToken = this.recoveryTokensRepository.create({
      token,
      active: true,
      user_id,
    });
    await this.recoveryTokensRepository.insert(recoveryToken);
    return recoveryToken;
  }
}
