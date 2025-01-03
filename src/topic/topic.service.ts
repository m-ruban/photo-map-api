import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from 'src/topic/topic.entity';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    private imageService: ImageService,
  ) {}

  async findAllByUser(user_id: number): Promise<Topic[]> {
    const topics = await this.topicRepository.find({
      where: { user_id, deleted: false },
      relations: ['images', 'owner'],
      take: 10,
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

  async delete(owner: number, topicId: number): Promise<null> {
    const topic = await this.topicRepository.findOneBy({ id: topicId });
    if (!topic) {
      throw new BadRequestException();
    }
    if (topic.user_id !== owner) {
      throw new UnauthorizedException();
    }
    await this.topicRepository.update({ id: topicId }, { deleted: true });
    return null;
  }
}
