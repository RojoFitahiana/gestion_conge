import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HolidayDays } from './entities/holiday-day.entity';

@Injectable()
export class HolidayDaysService {
  constructor(
    @InjectRepository(HolidayDays)
    private readonly holidayDaysRepository: Repository<HolidayDays>,
  ) {}

  async create(data: Partial<HolidayDays>): Promise<HolidayDays> {
    const holiday = this.holidayDaysRepository.create(data);
    return await this.holidayDaysRepository.save(holiday);
  }

  async findAll(): Promise<HolidayDays[]> {
    return await this.holidayDaysRepository.find();
  }

  async findOne(id: number): Promise<HolidayDays | null> {
    return await this.holidayDaysRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    data: Partial<HolidayDays>,
  ): Promise<HolidayDays | null> {
    await this.holidayDaysRepository.update(id, data);
    const updatedHoliday = await this.findOne(id);
    if (!updatedHoliday) {
      throw new Error(`HolidayDays avec l'ID ${id} non trouvé.`);
    }
    return updatedHoliday;
  }

  async remove(id: number): Promise<void> {
    await this.holidayDaysRepository.delete(id);
  }
}
