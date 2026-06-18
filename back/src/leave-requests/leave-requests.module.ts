import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequest } from './entities/leave-request.entity';
import { LeaveRequestsService } from './leave-requests.service';
import { LeaveRequestsController } from './leave-requests.controller';
import { LeaveBalance } from 'src/leave-balances/entities/leave-balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest, LeaveBalance])],
  controllers: [LeaveRequestsController],
  providers: [LeaveRequestsService],
})
export class LeaveRequestsModule {}
