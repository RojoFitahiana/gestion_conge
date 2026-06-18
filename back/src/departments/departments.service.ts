import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = this.departmentRepository.create(createDepartmentDto);
    return await this.departmentRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    await this.departmentRepository.update(id, updateDepartmentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.departmentRepository.delete(id);
  }
}
