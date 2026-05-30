import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GameService } from './game.service';

@ApiTags('game')
@ApiBearerAuth()
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('leaderboard')
  getLeaderboard() {
    return this.gameService.getLeaderboard();
  }
}
