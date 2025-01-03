import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs';
import { parse, join } from 'path';
import * as sharp from 'sharp';
import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/image/image.entity';

export const PATH_ROOT_IMAGES = join(process.cwd(), 'public/images');
export const PATH_TEMP_IMAGES = join(PATH_ROOT_IMAGES, '/temp');
const SIZES = ['xs', 's', 'm', 'l'] as const;

interface ImageConfig {
  resize: { width?: number; height?: number };
  webp: { quality?: number };
}
type Size = (typeof SIZES)[number];
type ImageConfigBySize = Record<Size, ImageConfig>;
type ImageLinksBySize = Record<Size, string>;

const IMAGE_SIZES_CONFIG: ImageConfigBySize = {
  xs: {
    resize: { width: 50, height: 50 },
    webp: { quality: 100 },
  },
  s: {
    resize: { width: 100, height: 100 },
    webp: { quality: 100 },
  },
  m: {
    resize: { height: 100 },
    webp: { quality: 100 },
  },
  l: {
    resize: { width: 350 },
    webp: { quality: 100 },
  },
};

export const checkAndCreatePath = (path: string) => {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
};

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async processUserFile(file: Express.Multer.File, userId: number): Promise<Image> {
    const danas = new Date().toISOString().slice(0, 10);
    const relativePath = join(`/${userId}`, `/${danas}`);
    const userPath = join(PATH_ROOT_IMAGES, relativePath);
    const parsedInfo = parse(file.filename);
    checkAndCreatePath(userPath);

    // origin, resize to 1000px and fix quality
    const originFileName = `${parsedInfo.name}.webp`;
    const originFilePath = join(userPath, originFileName);
    const originImageBuffer = await sharp(file.path).resize({ width: 1000 }).webp({ quality: 75 }).toBuffer();
    writeFileSync(originFilePath, originImageBuffer);

    // for other images use config
    const result: ImageLinksBySize = { xs: '', s: '', m: '', l: '' };
    for (const size of SIZES) {
      const config = IMAGE_SIZES_CONFIG[size];
      const fileNameBySize = `${parsedInfo.name}_${size}.webp`;
      const filePathBySize = join(userPath, fileNameBySize);
      const { resize, webp } = config;
      const ImageBufferXS = await sharp(originFilePath).resize(resize).webp(webp).toBuffer();
      writeFileSync(filePathBySize, ImageBufferXS);
      result[size] = join(relativePath, fileNameBySize);
    }

    // clear tmp files
    unlinkSync(file.path);

    const image = new Image();
    image.originPath = join(relativePath, originFileName);
    image.pathXS = result.xs;
    image.pathS = result.s;
    image.pathM = result.m;
    image.pathL = result.l;
    return await this.imageRepository.save(image);
  }

  async linkTopic(topicId: number, images: number[]): Promise<null> {
    await this.imageRepository.update({ id: In(images) }, { topicId });
    return null;
  }
}
