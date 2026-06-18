import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LeaveBalanceService } from './leave-balances.service';
import { CreateLeaveBalanceDto } from './dto/create-leave-balance.dto';
import { UpdateLeaveBalanceDto } from './dto/update-leave-balance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveBalance } from './entities/leave-balance.entity';

@Controller('leave-balances')
export class LeaveBalanceController {
  constructor(
    private readonly leaveBalanceService: LeaveBalanceService,
    @InjectRepository(LeaveBalance)
    private readonly leaveBalanceRepository: Repository<LeaveBalance>,
  ) {}

  // Crée un nouveau solde de congé
  @Post()
  create(@Body() createLeaveBalanceDto: CreateLeaveBalanceDto) {
    return this.leaveBalanceService.create(createLeaveBalanceDto);
  }

  // Récupère tous les soldes de congé
  @Get()
  findAll2() {
    return this.leaveBalanceService.findAll();
  }

  // Récupère un solde de congé par ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveBalanceService.findOne(+id);
  }

  // Met à jour un solde de congé par ID
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeaveBalanceDto: UpdateLeaveBalanceDto,
  ) {
    return this.leaveBalanceService.update(+id, updateLeaveBalanceDto);
  }

  // Supprime un solde de congé par ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveBalanceService.remove(+id);
  }

  // Service
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

  @Get('employee/:id/balance') // Décorateur dans le contrôleur
  async getEmployeeBalance(@Param('id') id: string) {
    return this.leaveBalanceService.getBalanceByEmployee(+id);
  }

  @Get()
  async findAll(
    @Query('employeeId') employeeId?: number,
    @Query('leaveTypeId') leaveTypeId?: number,
  ): Promise<LeaveBalance[]> {
    return this.leaveBalanceService.findAll(employeeId, leaveTypeId);
  }
}
