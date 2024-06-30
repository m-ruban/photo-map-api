import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request as NestRequest,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, RequestWithUser } from 'src/auth/auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@NestRequest() request: RequestWithUser) {
    return request.user;
  }

  @UseGuards(AuthGuard)
  @Get('exit')
  exit(@NestRequest() request: RequestWithUser) {
    return this.authService.exit(request);
  }
}
