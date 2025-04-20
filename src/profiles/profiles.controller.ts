import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Controller('api/profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profilesService.create(createProfileDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    try {
      return await this.profilesService.update(id, updateProfileDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to update profile');
    }
  }
}
