import { Controller, UseGuards, Post, Request as NestRequest, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from 'src/image/image.service';
import { AuthGuard, RequestWithUser } from 'src/auth/auth.guard';

const FILE_SIZE = Math.pow(1024, 2) * 5; // 5 MB

@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: FILE_SIZE },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File, @NestRequest() request: RequestWithUser) {
    return this.imageService.processUserFile(file, request.user.id);
  }
}
