import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { IntelService } from './intel.service';

@ApiTags('intel')
@ApiBearerAuth()
@Controller('intel')
export class IntelController {
  constructor(private readonly intelService: IntelService) {}

  @Get('red-zones')
  getRedZones() {
    return this.intelService.getRedZones();
  }

  @Post('red-zones')
  createRedZone(@Body() body: any) {
    return this.intelService.createRedZone(body);
  }
}
