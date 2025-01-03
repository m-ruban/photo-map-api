import { Body, Controller, Get, Request as NestRequest, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard, RequestWithUser } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('profile')
export class ProfileController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  getProfile(@NestRequest() request: RequestWithUser) {
    // TODO return info from db
    return request.user;
  }

  @UseGuards(AuthGuard)
  @Patch('/')
  updateProfile(@Body() requestDto: Record<string, string>, @NestRequest() request: RequestWithUser) {
    return this.userService.update(request.user.id, requestDto);
  }
}
