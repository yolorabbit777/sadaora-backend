import { Injectable } from '@nestjs/common';
import { ProfilesService } from '@/profiles/profiles.service';
import { Profile } from '@/profiles/entities/profile.entity';

@Injectable()
export class FeedService {
  constructor(private readonly profilesService: ProfilesService) {}

  async getFeed(
    interest?: string,
    page = 1,
    limit = 10,
  ): Promise<{
    profiles: Profile[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { profiles, total } = await this.profilesService.filterByInterest(
      interest,
      page,
      limit,
    );

    return {
      profiles,
      total,
      page,
      limit,
    };
  }
}
