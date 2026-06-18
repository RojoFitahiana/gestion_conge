import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { Department } from '../../departments/entities/department.entity';

@Entity()
export class JobFunction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'employee', 'manager'], // Définissez vos rôles
    default: 'employee',
  })
  role: string; // Nouvelle colonne pour le rôle

  @OneToMany(() => Employee, (employee) => employee.jobFunction)
  employees: Employee[];

  @ManyToOne(() => Department, (department) => department.jobfunctions)
  department: Department;
}
