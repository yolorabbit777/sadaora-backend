import { Injectable } from '@nestjs/common';
import { ProfilesService } from '@/profiles/profiles.service';

@Injectable()
export class StatsService {
  constructor(private readonly profilesService: ProfilesService) {}

  async getTopInterests() {
    const allInterestsStats = await this.profilesService.getInterestsStats();
    const topInterests = allInterestsStats.slice(0, 3);

    return {
      topInterests,
      total: allInterestsStats.length,
    };
  }
}
