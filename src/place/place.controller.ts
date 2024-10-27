import { Controller, Get, UseGuards, Request as NestRequest, Param, Delete, Post, Body } from '@nestjs/common';
import { PlacesService } from 'src/place/place.service';
import { AuthGuard, RequestWithUser } from 'src/auth/auth.guard';

@Controller('places')
export class PlaceController {
  constructor(private placesService: PlacesService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  getPlaces(@NestRequest() request: RequestWithUser) {
    return this.placesService.findAllByUser(request.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('/')
  createPlace(@Body() placeDto: Record<string, number>, @NestRequest() request: RequestWithUser) {
    return this.placesService.create(placeDto.lat, placeDto.long, request.user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:placeId')
  deletePlace(@Param() params: { placeId: number }, @NestRequest() request: RequestWithUser) {
    return this.placesService.delete(request.user.id, params.placeId);
  }
}
