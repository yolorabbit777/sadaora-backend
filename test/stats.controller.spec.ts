import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from '@/stats/stats.controller';
import { StatsService } from '@/stats/stats.service';

describe('StatsController', () => {
  let controller: StatsController;
  let service: StatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [
        {
          provide: StatsService,
          useValue: {
            getTopInterests: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StatsController>(StatsController);
    service = module.get<StatsService>(StatsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTopInterests', () => {
    it('should return top interests from the service', async () => {
      const expectedResult = {
        topInterests: [
          { interest: 'React', count: 10 },
          { interest: 'NestJS', count: 8 },
          { interest: 'GraphQL', count: 6 },
        ],
        total: 15,
      };

      jest.spyOn(service, 'getTopInterests').mockResolvedValue(expectedResult);

      const result = await controller.getTopInterests();

      expect(result).toEqual(expectedResult);
      expect(service.getTopInterests).toHaveBeenCalled();
    });

    it('should return empty array when no interests are found', async () => {
      const expectedResult = {
        topInterests: [],
        total: 0,
      };

      jest.spyOn(service, 'getTopInterests').mockResolvedValue(expectedResult);

      const result = await controller.getTopInterests();

      expect(result).toEqual(expectedResult);
      expect(service.getTopInterests).toHaveBeenCalledWith();
    });

    it('should return fewer than 3 interests when there are not enough unique interests', async () => {
      const expectedResult = {
        topInterests: [
          { interest: 'React', count: 5 },
          { interest: 'NestJS', count: 2 },
        ],
        total: 2,
      };

      jest.spyOn(service, 'getTopInterests').mockResolvedValue(expectedResult);

      const result = await controller.getTopInterests();

      expect(result).toEqual(expectedResult);
      expect(result.topInterests.length).toBe(2);
      expect(service.getTopInterests).toHaveBeenCalled();
    });
  });
});
