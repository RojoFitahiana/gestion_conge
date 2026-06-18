import { Test, TestingModule } from '@nestjs/testing';
import { HolidayDaysService } from './holiday-days.service';

describe('HolidayDaysService', () => {
  let service: HolidayDaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HolidayDaysService],
    }).compile();

    service = module.get<HolidayDaysService>(HolidayDaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
