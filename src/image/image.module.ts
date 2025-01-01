import { extname } from 'path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImageService, PATH_TEMP_IMAGES } from 'src/image/image.service';
import { Image } from 'src/image/image.entity';
import { ImageController } from 'src/image/image.controller';

const MIME_TYPES = ['image/jpeg', 'image/png'];

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    MulterModule.register({
      storage: diskStorage({
        destination: (_, __, callback) => {
          callback(null, PATH_TEMP_IMAGES);
        },
        filename: (_, file, callback) => {
          const ext = extname(file.originalname);
          callback(null, `${Date.now()}${ext}`);
        },
      }),
      fileFilter: (_, file, callback) => {
        if (MIME_TYPES.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Only images are allowed...'), false);
        }
      },
    }),
  ],
  providers: [ImageService],
  exports: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
