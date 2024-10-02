import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoveryService } from 'src/recovery/recovery.service';
import { RecoveryToken } from 'src/recovery/recoveryToken.entity';
import { UsersModule } from 'src/users/users.module';
import { RecoveryController } from 'src/recovery/recovery.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RecoveryToken]), UsersModule],
  providers: [RecoveryService],
  exports: [RecoveryService],
  controllers: [RecoveryController],
})
export class RecoveryModule {}
