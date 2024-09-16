import { Body, Controller, Post } from '@nestjs/common';
import { RecoveryService } from './recovery.service';

@Controller('recovery')
export class RecoveryController {
  constructor(private recoveryService: RecoveryService) {}

  @Post('send-token')
  sendRevoverToken(@Body() requestDto: Record<string, string>) {
    return this.recoveryService.sendRevoverToken(requestDto.email);
  }

  @Post('change-password')
  updatePassword(@Body() requestDto: Record<string, string>) {
    return this.recoveryService.updatePassword(
      requestDto['recover-token'],
      requestDto.password,
    );
  }
}
