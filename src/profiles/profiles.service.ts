import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const newProfile = this.profilesRepository.create(createProfileDto);
    return this.profilesRepository.save(newProfile);
  }

  async findAll(): Promise<Profile[]> {
    return this.profilesRepository.find();
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profilesRepository.findOne({ where: { id } });
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.findOne(id);

    Object.assign(profile, updateProfileDto);

    return this.profilesRepository.save(profile);
  }

  async filterByInterest(
    interest?: string,
    page = 1,
    limit = 10,
  ): Promise<{ profiles: Profile[]; total: number }> {
    const skip = (page - 1) * limit;

    let options: FindManyOptions<Profile> = {
      take: limit,
      skip,
    };

    if (interest) {
      options.where = {
        interests: Like(`%${interest}%`),
      };
    }

    const [profiles, total] =
      await this.profilesRepository.findAndCount(options);

    if (interest) {
      const exactMatches = profiles.filter((profile) =>
        profile.interests.includes(interest),
      );

      return {
        profiles: exactMatches.slice(0, limit),
        total: exactMatches.length,
      };
    }

    return { profiles, total };
  }

  async getInterestsStats(): Promise<{ interest: string; count: number }[]> {
    const allProfiles = await this.profilesRepository.find();
    const interestCountMap = new Map<string, number>();

    allProfiles.forEach((profile) => {
      profile.interests.forEach((interest) => {
        const currentCount = interestCountMap.get(interest) || 0;
        interestCountMap.set(interest, currentCount + 1);
      });
    });

    const interestStats = Array.from(interestCountMap.entries()).map(
      ([interest, count]) => ({
        interest,
        count,
      }),
    );

    return interestStats.sort((a, b) => b.count - a.count);
  }
}
