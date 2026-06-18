import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveBalance } from './entities/leave-balance.entity';
import { LeaveBalanceService } from './leave-balances.service';
import { LeaveBalanceController } from './leave-balances.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveBalance])],
  controllers: [LeaveBalanceController],
  providers: [LeaveBalanceService],
})
export class LeaveBalancesModule {}
