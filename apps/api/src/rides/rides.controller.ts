import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RidesService } from './rides.service';

@ApiTags('rides')
@ApiBearerAuth()
@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post()
  requestRide(@Body() body: { userId: string; pickupLat: number; pickupLng: number; destLat: number; destLng: number }) {
    return this.ridesService.requestRide(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ridesService.findById(id);
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.ridesService.cancel(id);
  }
}
