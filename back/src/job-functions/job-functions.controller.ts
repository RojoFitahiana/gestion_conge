import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobFunctionsService } from './job-functions.service';
import { CreateJobFunctionDto } from './dto/create-job-function.dto';
import { UpdateJobFunctionDto } from './dto/update-job-function.dto';

@Controller('job-functions')
export class JobFunctionsController {
  constructor(private readonly jobFunctionsService: JobFunctionsService) {}

  // Create a new job function
  @Post()
  create(@Body() createJobFunctionDto: CreateJobFunctionDto) {
    return this.jobFunctionsService.create(createJobFunctionDto);
  }

  // Retrieve all job functions
  @Get()
  findAll() {
    return this.jobFunctionsService.findAll();
  }

  // Retrieve a job function by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobFunctionsService.findOne(+id); // Convert ID to number
  }

  // Update a job function by ID
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobFunctionDto: UpdateJobFunctionDto,
  ) {
    return this.jobFunctionsService.update(+id, updateJobFunctionDto);
  }

  // Delete a job function by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobFunctionsService.remove(+id);
  }
}
