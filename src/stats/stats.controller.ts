import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('api/stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  getTopInterests() {
    return this.statsService.getTopInterests();
  }
}
