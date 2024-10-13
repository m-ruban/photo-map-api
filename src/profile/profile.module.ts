import { Module } from '@nestjs/common';
import { ProfileController } from 'src/profile/profile.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ProfileController],
})
export class ProfileModule {}
