import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveRequest } from './entities/leave-request.entity';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { LeaveBalance } from '../leave-balances/entities/leave-balance.entity';
//import { differenceInDays } from 'date-fns'; // 👈 Ajoutez cette ligne

@Injectable()
export class LeaveRequestsService {
  constructor(
    @InjectRepository(LeaveRequest)
    private leaveRequestsRepository: Repository<LeaveRequest>,
    @InjectRepository(LeaveBalance) // 👈 Injection du repository manquant
    private leaveBalanceRepository: Repository<LeaveBalance>,
  ) {}

  async create(createDto: CreateLeaveRequestDto): Promise<LeaveRequest> {
    const newRequest = this.leaveRequestsRepository.create({
      date_debut: createDto.date_debut,
      date_fin: createDto.date_fin,
      commentaire: createDto.commentaire,
      employe: { id: createDto.employe_id }, // Utilisez les bonnes propriétés
      type_conge: { id: createDto.type_conge_id },
    });
    return this.leaveRequestsRepository.save(newRequest);
  }

  async findByEmployee(employeeId: number): Promise<LeaveRequest[]> {
    return this.leaveRequestsRepository.find({
      where: { employe: { id: employeeId } },
      relations: ['employe', 'type_conge'], // Charge les relations
    });
  }

  async findAll(): Promise<LeaveRequest[]> {
    return this.leaveRequestsRepository.find({
      relations: ['employe', 'employe.departement', 'type_conge'], // Inclusion du département
      select: {
        id: true,
        date_debut: true,
        date_fin: true,
        statut: true,
        date_soumission: true,
        commentaire: true,
        employe: {
          id: true,
          nom: true,
          prenom: true,
          departement: {
            id: true,
            nom_departement: true,
          },
        },
        type_conge: {
          id: true,
          name: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<LeaveRequest> {
    const request = await this.leaveRequestsRepository.findOne({
      where: { id },
      relations: ['employe', 'employe.departement', 'type_conge'], // Ajout du département
    });
    if (!request) throw new NotFoundException('Demande non trouvée');
    return request;
  }

  async update(
    id: number,
    updateDto: Partial<LeaveRequest>,
  ): Promise<LeaveRequest> {
    await this.leaveRequestsRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.leaveRequestsRepository.delete(id);
  }

  async getLeaveBalance(
    employeeId: number,
  ): Promise<{ remainingDays: number }> {
    const balance = await this.leaveBalanceRepository.findOne({
      where: {
        employee: { id: employeeId },
        leaveType: { name: 'Congé payé' },
      },
    });
    return { remainingDays: balance?.remainingDays || 0 };
  }
}
