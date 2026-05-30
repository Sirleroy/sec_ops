import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SocialService } from './social.service';

@ApiTags('social')
@ApiBearerAuth()
@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get('feed')
  getFeed() {
    return this.socialService.getFeed();
  }

  @Post('posts')
  createPost(@Body() body: any) {
    return this.socialService.createPost(body);
  }
}
