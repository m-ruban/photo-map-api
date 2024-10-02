import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request as NestRequest, UseGuards } from '@nestjs/common';
import { AuthGuard, RequestWithUser } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('exit')
  exit(@NestRequest() request: RequestWithUser) {
    return this.authService.exit(request);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: Record<string, string>) {
    return this.authService.createUser(
      registerDto.name,
      registerDto.email,
      registerDto.description,
      registerDto.password,
    );
  }
}
