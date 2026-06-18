import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { JobFunction } from '../../job-functions/entities/job-function.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom_departement: string;

  @Column({ nullable: true })
  responsable_id: number;

  @OneToMany(() => Employee, (employee) => employee.departement)
  employees: Employee[];

  @OneToMany(() => JobFunction, (jobFunction) => jobFunction.department)
  jobfunctions: JobFunction[];
}
