import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FeedsService } from './feeds.service';

@ApiTags('feeds')
@ApiBearerAuth()
@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}

  @Post('ingest')
  ingest(@Body() body: any) {
    return this.feedsService.ingest(body);
  }
}
