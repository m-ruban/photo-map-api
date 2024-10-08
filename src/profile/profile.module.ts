import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProfileController } from 'src/profile/profile.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: String(process.env.JWT_EXPIRES_IN_DAYS),
        },
      }),
    }),
  ],
  controllers: [ProfileController],
})
export class ProfileModule {}
