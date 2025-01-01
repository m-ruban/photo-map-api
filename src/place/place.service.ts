import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from 'src/place/place.entity';
import { DataSource } from 'typeorm';

interface QuerySelectResult {
  id: number;
  point: {
    type: string;
    coordinates: number[];
  };
  created_at: string;
  user_id: number;
}

type QueryInsertResult = { id: number }[];

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private placesRepository: Repository<Place>,
    private dataSource: DataSource,
  ) {}

  async findAllByUser(user_id: number): Promise<Place[]> {
    // TODO condition on polygon
    const result: QuerySelectResult[] = await this.dataSource.query(
      'select places.id, ' +
        'ST_AsGeoJSON(places.point)::jsonb as point,' +
        'places.created_at,' +
        'places.user_id from places where places.user_id=$1',
      [user_id],
    );
    return result.map(({ id, point, created_at, user_id }) => {
      const place = new Place();
      place.id = id;
      place.point = point;
      place.created_at = new Date(created_at);
      place.user_id = user_id;
      return place;
    });
  }

  async create(lat: number, long: number, user_id: number): Promise<Place> {
    const result: QueryInsertResult = await this.dataSource.query(
      'INSERT INTO places (user_id, point)' + ` VALUES ($1, 'SRID=4326;POINT(${lat} ${long})')` + ' RETURNING id',
      [user_id],
    );
    const place = new Place();
    place.id = result[0].id;
    place.point = {
      type: 'Point',
      coordinates: [lat, long],
    };
    place.user_id = user_id;
    return place;
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
