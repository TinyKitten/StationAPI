import { ParseIntPipe } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Station } from 'src/graphql';
import { StationService } from './station.service';

@Resolver((of) => Station)
export class StationResolver {
  constructor(private readonly stationService: StationService) {}

  @Query((returns) => Station)
  async station(@Args('id', ParseIntPipe) id: number): Promise<Station> {
    return this.stationService.findOneById(id);
  }

  @Query((returns) => Station)
  async stationByGroupId(@Args('groupId') groupId: number): Promise<Station> {
    return this.stationService.findOneByGroupId(groupId);
  }

  @Query((returns) => Station)
  async stationByCoords(
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number,
  ): Promise<Station> {
    return this.stationService.findOneByCoords(latitude, longitude);
  }

  @Query((returns) => Station)
  async stationsByLineId(@Args('lineId') lineId: number): Promise<Station[]> {
    return this.stationService.getByLineId(lineId);
  }

  @Query((returns) => Station)
  async stationsByName(@Args('name') name: string): Promise<Station[]> {
    return this.stationService.getByName(name);
  }
}
