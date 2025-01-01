import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { PATH_TEMP_IMAGES, checkAndCreatePath } from 'src/image/image.service';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  checkAndCreatePath(PATH_TEMP_IMAGES);
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
