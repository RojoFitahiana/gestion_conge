import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveBalance } from './entities/leave-balance.entity'; // Remplace par le bon chemin d'importation de l'entité LeaveBalance

@Injectable()
export class LeaveBalanceService {
  constructor(
    @InjectRepository(LeaveBalance)
    private leaveBalanceRepository: Repository<LeaveBalance>,
  ) {}

  // Crée un nouveau solde de congé
  async create(leaveBalanceData: Partial<LeaveBalance>): Promise<LeaveBalance> {
    const leaveBalance = this.leaveBalanceRepository.create(leaveBalanceData);
    return this.leaveBalanceRepository.save(leaveBalance);
  }

  /*
  async findAll(): Promise<LeaveBalance[]> {
    return this.leaveBalanceRepository.find({
      relations: ['employee', 'leaveType'], // Charge les relations avec Employee et LeaveType
    });
  }*/

  async findAll(
    employeeId?: number,
    leaveTypeId?: number,
  ): Promise<LeaveBalance[]> {
    const query = this.leaveBalanceRepository
      .createQueryBuilder('leaveBalance')
      .innerJoinAndSelect('leaveBalance.employee', 'employee') // Alias "employee"
      .leftJoinAndSelect('leaveBalance.leaveType', 'leaveType');

    if (employeeId) {
      query.where('leaveBalance.employee.id = :employeeId', { employeeId }); // 👈 Utilisez l'alias complet
    }

    if (leaveTypeId) {
      query.andWhere('leaveBalance.leaveType.id = :leaveTypeId', {
        leaveTypeId,
      });
    }

    return query.getMany();
  }
  // Trouve un solde de congé par ID
  async findOne(id: number): Promise<LeaveBalance> {
    const leaveBalance = await this.leaveBalanceRepository.findOne({
      where: { id },
      relations: ['employee', 'leaveType'], // Charge les relations avec Employee et LeaveType
    });

    if (!leaveBalance) {
      throw new NotFoundException(`Leave balance with ID ${id} not found`);
    }

    return leaveBalance;
  }

  // Met à jour un solde de congé par ID
  async update(
    id: number,
    leaveBalanceData: Partial<LeaveBalance>,
  ): Promise<LeaveBalance> {
    await this.leaveBalanceRepository.update(id, leaveBalanceData);

    const updatedLeaveBalance = await this.leaveBalanceRepository.findOne({
      where: { id },
      relations: ['employee', 'leaveType'], // Charge les relations avec Employee et LeaveType
    });

    if (!updatedLeaveBalance) {
      throw new NotFoundException(
        `Leave balance with ID ${id} not found after update`,
      );
    }

    return updatedLeaveBalance;
  }

  // Supprime un solde de congé par ID
  async remove(id: number): Promise<void> {
    await this.leaveBalanceRepository.delete(id);
  }

  // Ajoutez cette méthode
  async getBalanceByEmployee(employeeId: number) {
    return this.leaveBalanceRepository
      .createQueryBuilder('lb')
      .select([
        'leaveType.name AS leaveType',
        'lb.usedDays',
        'lb.remainingDays',
      ])
      .leftJoin('lb.leaveType', 'leaveType')
      .where('lb.employee.id = :id', { id: employeeId })
      .getRawMany();
  }
}
