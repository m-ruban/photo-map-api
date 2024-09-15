import { Module } from '@nestjs/common';
import { RecoveryTokensService } from './recoveryTokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoveryToken } from 'src/entities/recoveryToken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecoveryToken])],
  providers: [RecoveryTokensService],
  exports: [RecoveryTokensService],
})
export class RecoveryTokensModule {}
