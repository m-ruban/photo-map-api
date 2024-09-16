import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
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
