import { Module } from '@nestjs/common';
import { RecoveryService } from './recovery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoveryToken } from 'src/entities/recoveryToken.entity';
import { UsersModule } from '../users/users.module';
import { RecoveryController } from './recovery.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RecoveryToken]), UsersModule],
  providers: [RecoveryService],
  exports: [RecoveryService],
  controllers: [RecoveryController],
})
export class RecoveryModule {}
