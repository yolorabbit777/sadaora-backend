import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { ProfilesModule } from '@/profiles/profiles.module';

@Module({
  imports: [ProfilesModule],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
