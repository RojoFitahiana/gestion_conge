import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  // Crée un nouvel employé
  async create(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.employeesRepository.create(employeeData);
    return this.employeesRepository.save(employee);
  }

  // Trouve tous les employés
  async findAll(): Promise<Employee[]> {
    return this.employeesRepository.find({
      relations: ['departement', 'jobFunction', 'jobFunction.department'],
    });
  }

  // Trouve un employé par ID
  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeesRepository.findOne({
      where: { id },
      relations: ['departement', 'jobFunction', 'jobFunction.department'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  // Trouve un employé par email (nouvelle méthode ajoutée)

  // Met à jour un employé par ID
  async update(id: number, employeeData: Partial<Employee>): Promise<Employee> {
    await this.employeesRepository.update(id, employeeData);

    const updatedEmployee = await this.employeesRepository.findOne({
      where: { id },
      relations: ['departement', 'jobFunction'],
    });

    if (!updatedEmployee) {
      throw new NotFoundException(
        `Employee with ID ${id} not found after update`,
      );
    }

    return updatedEmployee;
  }

  // Supprime un employé par ID
  async remove(id: number): Promise<void> {
    const result = await this.employeesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }

  // src/employees/employees.service.ts
  // Mettez à jour la méthode findOneByEmail pour charger jobFunction
  // src/employees/employees.service.ts
  async findOneByEmail(
    email: string,
    options: FindOneOptions<Employee> = {}, // Définit une valeur par défaut
  ): Promise<Employee | null> {
    return this.employeesRepository.findOne({
      where: { email },
      relations: ['departement', 'jobFunction'], // Charge systématiquement jobFunction
      ...options, // Permet de surcharger les options si nécessaire
    });
  }
}
