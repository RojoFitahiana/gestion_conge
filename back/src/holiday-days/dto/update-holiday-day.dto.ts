import { PartialType } from '@nestjs/mapped-types';
import { CreateHolidayDayDto } from './create-holiday-day.dto';

export class UpdateHolidayDayDto extends PartialType(CreateHolidayDayDto) {}
