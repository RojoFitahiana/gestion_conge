import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveType } from './entities/leave-type.entity';
import { LeaveTypesService } from './leave-types.service';
import { LeaveTypesController } from './leave-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveType])], // Importez le repository ici
  controllers: [LeaveTypesController],
  providers: [LeaveTypesService],
})
export class LeaveTypesModule {}
