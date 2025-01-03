import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from 'src/place/place.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private placesRepository: Repository<Place>,
    private dataSource: DataSource,
  ) {}

  async findAllByUser(user_id: number): Promise<Place[]> {
    const places = await this.placesRepository.find({
      where: { user_id },
      take: 10,
      order: { id: 'ASC' },
    });
    return places;
  }

  async create(lat: number, long: number, user_id: number): Promise<Place | null> {
    const result = await this.placesRepository
      .createQueryBuilder()
      .insert()
      .values({
        point: () => `'SRID=4326;POINT(${lat} ${long})'`,
        user_id,
      })
      .execute();
    const placeId = result.identifiers[0].id;
    return await this.placesRepository.findOneBy({ id: placeId });
  }

  async delete(owner: number, placeId: number): Promise<null> {
    const place = await this.placesRepository.findOneBy({ id: placeId });
    if (!place) {
      throw new BadRequestException();
    }
    if (place.user_id !== owner) {
      throw new UnauthorizedException();
    }
    await this.placesRepository.delete({ id: placeId });
    return null;
  }
}
