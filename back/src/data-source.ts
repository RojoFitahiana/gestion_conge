import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Employee } from './employees/entities/employee.entity';
import { Department } from './departments/entities/department.entity';
import { LeaveRequest } from './leave-requests/entities/leave-request.entity';
import { LeaveType } from './leave-types/entities/leave-type.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  port: 3306,
  database: 'nestjs',
  entities: [Employee, Department, LeaveRequest, LeaveType],
  migrations: ['src/migrations/*.ts'], // Dossier des migrations
  synchronize: false, // Désactiver synchronize pour utiliser les migrations
  logging: true,
});
