import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HolidayDays } from './entities/holiday-day.entity';
import { HolidayDaysService } from './holiday-days.service';
import { HolidayDaysController } from './holiday-days.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HolidayDays])],
  controllers: [HolidayDaysController],
  providers: [HolidayDaysService],
})
export class HolidayDaysModule {}
