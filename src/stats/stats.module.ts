import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { ProfilesModule } from '@/profiles/profiles.module';

@Module({
  imports: [ProfilesModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
