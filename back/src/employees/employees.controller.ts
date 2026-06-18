import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // Crée un nouvel employé
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  // Récupère tous les employés
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  // Récupère un employé par ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id); // Conversion de l'id en number
  }

  // Met à jour un employé par ID
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto); // Conversion de l'id en number
  }

  // Supprime un employé par ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id); // Conversion de l'id en number
  }
}
