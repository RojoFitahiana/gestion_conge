import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { LeaveRequest } from '../../leave-requests/entities/leave-request.entity';
import { JobFunction } from '../../job-functions/entities/job-function.entity';
import { LeaveBalance } from 'src/leave-balances/entities/leave-balance.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mot_de_passe: string;

  @Column({ type: 'date' })
  date_naissance: Date;

  @Column()
  genre: string;

  @Column({ type: 'date' })
  date_embauche: Date;

  @ManyToOne(() => Department, (department) => department.employees)
  departement: Department;

  @OneToMany(() => LeaveRequest, (leaveRequest) => leaveRequest.employe)
  leaveRequests: LeaveRequest[];

  @ManyToOne(() => JobFunction, (jobFunction) => jobFunction.employees)
  jobFunction: JobFunction;

  @OneToMany(() => LeaveBalance, (leaveBalance) => leaveBalance.employee)
  leaveBalances: LeaveBalance[];
}
