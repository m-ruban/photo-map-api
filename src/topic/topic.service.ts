import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Raw } from 'typeorm';
import { Topic } from 'src/topic/topic.entity';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    private imageService: ImageService,
  ) {}

  async findAllByUser(userId: number): Promise<Topic[]> {
    const topics = await this.topicRepository.find({
      where: { user_id: userId, deleted: false },
      relations: ['images', 'owner'],
      take: 20,
      order: { id: 'ASC' },
    });
    return topics;
  }

  async findAllByParams(
    from: string,
    to: string,
    leftTopLat?: number,
    leftTopLong?: number,
    rightBottomLat?: number,
    rightBottomLong?: number,
  ): Promise<Topic[]> {
    const where: Record<string, unknown> = { deleted: false };
    if (from && to) {
      where.createdAt = Between(new Date(from).toISOString(), new Date(to).toISOString());
    }
    if (leftTopLat && leftTopLong && rightBottomLat && rightBottomLong) {
      const rightTopLat = rightBottomLat;
      const rightTopLong = leftTopLong;
      const leftBottomLat = leftTopLat;
      const leftBottomLong = rightBottomLong;
      const polygon =
        `SRID=4326;POLYGON((${leftTopLat} ${leftTopLong},` +
        `${rightTopLat} ${rightTopLong}, ` +
        `${rightBottomLat} ${rightBottomLong}, ` +
        `${leftBottomLat} ${leftBottomLong}, ` +
        `${leftTopLat} ${leftTopLong}))`;
      where.point = Raw(() => `ST_Contains('${polygon}', "Topic"."point"::geometry)`);
    }
    const topics = await this.topicRepository.find({
      where,
      relations: ['images', 'owner'],
      take: 20,
      order: { id: 'ASC' },
    });
    return topics;
  }

  async create(
    description: string,
    privated: boolean,
    lat: number,
    long: number,
    address: string,
    images: number[],
    user_id: number,
  ): Promise<Topic | null> {
    const result = await this.topicRepository
      .createQueryBuilder()
      .insert()
      .values({
        description,
        likes: 0,
        privated,
        point: () => `'SRID=4326;POINT(${lat} ${long})'`,
        address,
        deleted: false,
        user_id,
      })
      .execute();
    const topicId = result.identifiers[0].id;
    await this.imageService.linkTopic(topicId, images);
    return await this.topicRepository.findOneBy({ id: topicId });
  }

  async checkOwner(currentUser: number, topicId: number) {
    const topic = await this.topicRepository.findOneBy({ id: topicId });
    if (!topic) {
      throw new BadRequestException();
    }
    if (topic.user_id !== currentUser) {
      throw new UnauthorizedException();
    }
  }

  async update(
    currentUser: number,
    topicId: number,
    description: string,
    privated: boolean,
    lat: number,
    long: number,
    address: string,
    images: number[],
  ): Promise<Topic | null> {
    await this.checkOwner(currentUser, topicId);
    await this.imageService.unlinkTopic(topicId);
    await this.topicRepository
      .createQueryBuilder()
      .update()
      .set({
        description,
        privated,
        point: () => `'SRID=4326;POINT(${lat} ${long})'`,
        address,
      })
      .where({ id: topicId })
      .execute();
    await this.imageService.linkTopic(topicId, images);
    return await this.topicRepository.findOneBy({ id: topicId });
  }

  async delete(currentUser: number, topicId: number): Promise<null> {
    await this.checkOwner(currentUser, topicId);
    await this.topicRepository.update({ id: topicId }, { deleted: true });
    return null;
  }
}
