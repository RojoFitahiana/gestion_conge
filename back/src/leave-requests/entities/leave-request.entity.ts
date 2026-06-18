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
export class LeaveRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date_debut: Date;

  @Column({ type: 'date' })
  date_fin: Date;

  @Column({ default: 'en_attente' })
  statut: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_soumission: Date;

  @Column({ nullable: true })
  commentaire: string;

  // Relations (sans colonnes redond  aantes)
  @ManyToOne(() => Employee, (employee) => employee.leaveRequests)
  @JoinColumn({ name: 'employe_id' }) // Gère automatiquement la colonne SQL
  employe: Employee;

  @ManyToOne(() => LeaveType, (leaveType) => leaveType.leaveRequests)
  @JoinColumn({ name: 'type_conge_id' }) // Gère automatiquement la colonne SQL
  type_conge: LeaveType;
}
