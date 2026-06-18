import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HolidayDaysService } from './holiday-days.service';
import { CreateHolidayDayDto } from './dto/create-holiday-day.dto';
import { UpdateHolidayDayDto } from './dto/update-holiday-day.dto';

@Controller('holiday-days')
export class HolidayDaysController {
  constructor(private readonly holidayDaysService: HolidayDaysService) {}

  // Crée un nouvel enregistrement de jours fériés
  @Post()
  create(@Body() createHolidayDaysDto: CreateHolidayDayDto) {
    return this.holidayDaysService.create(createHolidayDaysDto);
  }

  // Récupère tous les jours fériés
  @Get()
  findAll() {
    return this.holidayDaysService.findAll();
  }

  // Récupère un jour férié par ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holidayDaysService.findOne(+id);
  }

  // Met à jour un jour férié par ID
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHolidayDaysDto: UpdateHolidayDayDto,
  ) {
    return this.holidayDaysService.update(+id, updateHolidayDaysDto);
  }

  // Supprime un jour férié par ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holidayDaysService.remove(+id);
  }
}
