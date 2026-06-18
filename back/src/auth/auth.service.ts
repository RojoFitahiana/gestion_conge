// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from '../employees/employees.service';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private employeesService: EmployeesService,
    private jwtService: JwtService,
  ) {}

  public async login(email: string, password: string) {
    // 'public' ajouté
    try {
      const user = await this.employeesService.findOneByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.mot_de_passe))) {
        throw new UnauthorizedException('Identifiants invalides');
      }
      return {
        token: this.jwtService.sign({ id: user.id, email: user.email }),
        user: {
          id: user.id,
          email: user.email,
          nom: user.nom,
          role: user.jobFunction.role,
          // auth.service.ts
          departement: user.departement.nom_departement,
          departementID: user.departement.id,
        },
      };
    } catch {
      throw new UnauthorizedException("Échec de l'authentification");
    }
  }
}
