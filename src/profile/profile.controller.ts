import {
  Controller,
  Get,
  Request as NestRequest,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, RequestWithUser } from 'src/auth/auth.guard';

@Controller('profile')
export class ProfileController {
  @UseGuards(AuthGuard)
  @Get('/')
  getProfile(@NestRequest() request: RequestWithUser) {
    return request.user;
  }
}
