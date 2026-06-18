import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DepartmentsModule } from './departments/departments.module';
import { LeaveRequestsModule } from './leave-requests/leave-requests.module';
import { LeaveTypesModule } from './leave-types/leave-types.module';
import { EmployeesModule } from './employees/employees.module';
import { Department } from './departments/entities/department.entity';
import { Employee } from './employees/entities/employee.entity';
import { LeaveRequest } from './leave-requests/entities/leave-request.entity';
import { LeaveType } from './leave-types/entities/leave-type.entity';
import { JobFunctionsModule } from './job-functions/job-functions.module';
import { LeaveBalancesModule } from './leave-balances/leave-balances.module';
import { HolidayDaysModule } from './holiday-days/holiday-days.module';
import { AuthModule } from './auth/auth.module';

const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  port: 3306,
  database: 'nestjs',
  autoLoadEntities: true,
  entities: [Employee, Department, LeaveRequest, LeaveType],
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    EmployeesModule,
    LeaveTypesModule,
    LeaveRequestsModule,
    DepartmentsModule,
    JobFunctionsModule,
    LeaveBalancesModule,
    HolidayDaysModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
