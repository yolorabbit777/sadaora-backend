import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { Profile } from '@/profiles/entities/profile.entity';

@Controller('api/feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async getFeed(
    @Query('interest') interest?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<{
    profiles: Profile[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.feedService.getFeed(interest, page, limit);
  }
}
