import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LeaveRequest } from '../../leave-requests/entities/leave-request.entity';
import { LeaveBalance } from 'src/leave-balances/entities/leave-balance.entity';

@Entity()
export class LeaveType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Ajouter la relation inverse pour dire qu'un LeaveType peut avoir plusieurs LeaveRequests
  @OneToMany(() => LeaveRequest, (leaveRequest) => leaveRequest.type_conge)
  leaveRequests: LeaveRequest[];

  @OneToMany(() => LeaveBalance, (leaveBalance) => leaveBalance.leaveType)
  leaveBalances: LeaveBalance[]; // Relation avec les soldes de congé des employés
}
