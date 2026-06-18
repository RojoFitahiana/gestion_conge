import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { LeaveType } from '../../leave-types/entities/leave-type.entity';

@Entity()
export class LeaveBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  accruedDays: number;

  @Column({ type: 'int', default: 0 })
  usedDays: number;

  @Column({ type: 'int', default: 0 })
  remainingDays: number;

  @Column({ type: 'int', default: 0 })
  accruedDaysPerMonth: number;

  @ManyToOne(() => LeaveType, (leaveType) => leaveType.leaveBalances)
  @JoinColumn({ name: 'leave_type_id' }) // 👈 Ajouté
  leaveType: LeaveType;

  // ... autres colonnes

  @ManyToOne(() => Employee, (employee) => employee.leaveBalances)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
