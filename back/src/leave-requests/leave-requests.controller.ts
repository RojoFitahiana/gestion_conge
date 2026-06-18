import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LeaveRequestsService } from './leave-requests.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
//import { ParseIntPipe } from '@nestjs/common';

@Controller('leave-requests')
export class LeaveRequestsController {
  constructor(private readonly leaveRequestsService: LeaveRequestsService) {}

  // Crée une nouvelle demande de congé
  @Post()
  create(@Body() createLeaveRequestDto: CreateLeaveRequestDto) {
    return this.leaveRequestsService.create(createLeaveRequestDto);
  }

  // leave-requests.controller.ts
  @Get('my-requests')
  findAllMine(@Query('employeeId') employeeId: number) {
    return this.leaveRequestsService.findByEmployee(employeeId);
  }

  // Récupère toutes les demandes de congé
  @Get()
  findAll() {
    return this.leaveRequestsService.findAll();
  }

  // Récupère une demande de congé par ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveRequestsService.findOne(+id);
  }

  // Met à jour une demande de congé par ID
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeaveRequestDto: UpdateLeaveRequestDto,
  ) {
    return this.leaveRequestsService.update(+id, updateLeaveRequestDto);
  }

  // Supprime une demande de congé par ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveRequestsService.remove(+id);
  }

  @Get('balance')
  getLeaveBalance(@Query('employeeId') employeeId: number) {
    return this.leaveRequestsService.getLeaveBalance(employeeId);
  }
}
