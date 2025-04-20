import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesController } from '@/profiles/profiles.controller';
import { ProfilesService } from '@/profiles/profiles.service';
import { Profile } from '@/profiles/entities/profile.entity';
import { CreateProfileDto } from '@/profiles/dto/create-profile.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProfilesController', () => {
  let controller: ProfilesController;
  let service: ProfilesService;
  let repository: Repository<Profile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [
        ProfilesService,
        {
          provide: getRepositoryToken(Profile),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ProfilesController>(ProfilesController);
    service = module.get<ProfilesService>(ProfilesService);
    repository = module.get<Repository<Profile>>(getRepositoryToken(Profile));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new profile', async () => {
      const createProfileDto: CreateProfileDto = {
        fullName: 'Aaron Deak',
        bio: 'Senior Full stack Developer at Sadaora',
        profileImageUrl: 'https://example.com/aarondeak.jpg',
        interests: ['React', 'Angular', 'Vue'],
      };

      const profile = new Profile();
      Object.assign(profile, createProfileDto);

      profile.id = 'test-uuid';
      profile.createdAt = new Date();
      profile.updatedAt = new Date();

      jest.spyOn(service, 'create').mockResolvedValue(profile);

      const result = await controller.create(createProfileDto);

      expect(result).toEqual(profile);
      expect(service.create).toHaveBeenCalledWith(createProfileDto);
    });
  });

  describe('update', () => {
    it('should update an existing profile', async () => {
      const id = 'test-uuid';
      const updatedData = {
        bio: 'Senior Software Engineer at Sadaora',
        interests: ['React', 'Nest.js'],
      };

      const updatedProfile = new Profile();
      Object.assign(updatedProfile, {
        id,
        fullName: 'Aaron Deak',
        ...updatedData,
        profileImageUrl: 'ttps://example.com/aarondeak.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(service, 'update').mockResolvedValue(updatedProfile);

      const result = await controller.update(id, updatedData);

      expect(result).toEqual(updatedProfile);
      expect(service.update).toHaveBeenCalledWith(id, updatedData);
    });

    it('should throw NotFoundException when profile does not exist', async () => {
      const id = 'non-existent-id';
      const updateData = { bio: 'Updated bio' };

      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      await expect(controller.update(id, updateData)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
