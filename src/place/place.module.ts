import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesService } from 'src/place/place.service';
import { Place } from 'src/place/place.entity';
import { PlaceController } from 'src/place/place.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  providers: [PlacesService],
  exports: [PlacesService],
  controllers: [PlaceController],
})
export class PlaceModule {}
