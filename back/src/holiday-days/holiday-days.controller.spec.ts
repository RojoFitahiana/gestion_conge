import { Test, TestingModule } from '@nestjs/testing';
import { HolidayDaysController } from './holiday-days.controller';
import { HolidayDaysService } from './holiday-days.service';

describe('HolidayDaysController', () => {
  let controller: HolidayDaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HolidayDaysController],
      providers: [HolidayDaysService],
    }).compile();

    controller = module.get<HolidayDaysController>(HolidayDaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
