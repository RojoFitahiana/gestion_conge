import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobFunction } from './entities/job-function.entity';
import { JobFunctionsService } from './job-functions.service';
import { JobFunctionsController } from './job-functions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JobFunction])],
  controllers: [JobFunctionsController],
  providers: [JobFunctionsService],
  exports: [JobFunctionsService], // (Facultatif) Exporter si utilisé ailleurs
})
export class JobFunctionsModule {}
