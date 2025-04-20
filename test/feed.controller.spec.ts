import { Test, TestingModule } from '@nestjs/testing';
import { FeedController } from '@/feed/feed.controller';
import { FeedService } from '@/feed/feed.service';
import { Profile } from '@/profiles/entities/profile.entity';

function createMockProfile(
  name = 'Test User',
  interests = ['React', 'NestJS'],
): Profile {
  const profile = new Profile();
  profile.id = `test-${Math.random()}`;
  profile.fullName = name;
  profile.bio = 'Test bio';
  profile.profileImageUrl = 'https://example.com/profile.jpg';
  profile.interests = interests;
  profile.createdAt = new Date();
  profile.updatedAt = new Date();
  return profile;
}

describe('FeedController', () => {
  let controller: FeedController;
  let service: FeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [
        {
          provide: FeedService,
          useValue: {
            getFeed: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FeedController>(FeedController);
    service = module.get<FeedService>(FeedService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFeed', () => {
    it('should return profiles with pagination', async () => {
      const expectedResponse = {
        profiles: [createMockProfile(), createMockProfile()],
        total: 12,
        page: 2,
        limit: 5,
      };

      jest.spyOn(service, 'getFeed').mockResolvedValue(expectedResponse);

      const result = await controller.getFeed();

      expect(result).toEqual(expectedResponse);
      expect(service.getFeed).toHaveBeenCalledWith(undefined, 1, 10);
    });

    it('should filter profiles by interest', async () => {
      const interest = 'React';
      const expectedResponse = {
        profiles: [createMockProfile('Aaron Deak', ['React'])],
        total: 1,
        page: 1,
        limit: 10,
      };

      jest.spyOn(service, 'getFeed').mockResolvedValue(expectedResponse);

      const result = await controller.getFeed(interest);

      expect(result).toEqual(expectedResponse);
      expect(service.getFeed).toHaveBeenCalledWith('React', 1, 10);
    });

    it('should apply custom pagination parameters', async () => {
      const page = 2;
      const limit = 5;
      const expectedResponse = {
        profiles: [createMockProfile(), createMockProfile()],
        total: 12,
        page: 2,
        limit: 5,
      };

      jest.spyOn(service, 'getFeed').mockResolvedValue(expectedResponse);

      const result = await controller.getFeed(undefined, page, limit);

      expect(result).toEqual(expectedResponse);
      expect(service.getFeed).toHaveBeenCalledWith(undefined, 2, 5);
    });

    it('should apply both interest filter and pagination', async () => {
      const interest = 'React';
      const page = 3;
      const limit = 2;
      const expectedResponse = {
        profiles: [createMockProfile('Aaron Deak', ['React'])],
        total: 5,
        page: 3,
        limit: 2,
      };
      jest.spyOn(service, 'getFeed').mockResolvedValue(expectedResponse);

      const result = await controller.getFeed(interest, page, limit);

      expect(result).toEqual(expectedResponse);
      expect(service.getFeed).toHaveBeenCalledWith('React', 3, 2);
    });
  });
});
