import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveType } from './entities/leave-type.entity';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class LeaveTypesService {
  constructor(
    @InjectRepository(LeaveType)
    private leaveTypeRepository: Repository<LeaveType>,
  ) {}

  async create(createLeaveTypeDto: CreateLeaveTypeDto): Promise<LeaveType> {
    const leaveType = this.leaveTypeRepository.create(createLeaveTypeDto);
    return await this.leaveTypeRepository.save(leaveType);
  }

  async findAll(): Promise<LeaveType[]> {
    return this.leaveTypeRepository.find();
  }

  async findOne(id: number): Promise<LeaveType> {
    const leaveType = await this.leaveTypeRepository.findOne({ where: { id } });

    if (!leaveType) {
      throw new NotFoundException(
        `Le type de congé avec l'ID ${id} n'a pas été trouvé`,
      );
    }

    return leaveType;
  }

  async update(
    id: number,
    updateLeaveTypeDto: UpdateLeaveTypeDto,
  ): Promise<LeaveType> {
    // Vérifie si l'élément existe, et lève une exception si non
    await this.findOne(id); // Si aucun enregistrement trouvé, cela lèvera une exception

    // Mettre à jour l'entité
    await this.leaveTypeRepository.update(id, updateLeaveTypeDto);

    // Retourne l'entité mise à jour
    return this.findOne(id); // Retourne l'entité après mise à jour
  }

  async remove(id: number): Promise<void> {
    await this.leaveTypeRepository.delete(id);
  }
}
