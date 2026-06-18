import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobFunction } from './entities/job-function.entity';

@Injectable()
export class JobFunctionsService {
  constructor(
    @InjectRepository(JobFunction)
    private jobFunctionsRepository: Repository<JobFunction>,
  ) {}

  // Create a new job function
  async create(jobFunctionData: Partial<JobFunction>): Promise<JobFunction> {
    const jobFunction = this.jobFunctionsRepository.create(jobFunctionData);
    return this.jobFunctionsRepository.save(jobFunction);
  }

  // Retrieve all job functions
  async findAll(): Promise<JobFunction[]> {
    return this.jobFunctionsRepository.find({
      relations: ['department'], // Vérifie que 'department' est bien pris en compte
    });
  }

  // Retrieve a job function by ID
  async findOne(id: number): Promise<JobFunction> {
    const jobFunction = await this.jobFunctionsRepository.findOne({
      where: { id },
    });

    if (!jobFunction) {
      throw new NotFoundException(`Job function with ID ${id} not found`);
    }

    return jobFunction;
  }

  // Update a job function by ID
  async update(
    id: number,
    jobFunctionData: Partial<JobFunction>,
  ): Promise<JobFunction> {
    await this.jobFunctionsRepository.update(id, jobFunctionData);

    const updatedJobFunction = await this.jobFunctionsRepository.findOne({
      where: { id },
    });

    if (!updatedJobFunction) {
      throw new NotFoundException(
        `Job function with ID ${id} not found after update`,
      );
    }

    return updatedJobFunction;
  }

  // Delete a job function by ID
  async remove(id: number): Promise<void> {
    await this.jobFunctionsRepository.delete(id);
  }

  async findByDepartment(departmentId: number): Promise<JobFunction[]> {
    return this.jobFunctionsRepository.find({
      where: { department: { id: departmentId } }, // Filtrer par departmentId
      relations: ['department'], // Charger les relations
    });
  }
}
