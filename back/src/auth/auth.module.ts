// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { EmployeesModule } from '../employees/employees.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; // <-- Ajouter cette ligne

@Module({
  imports: [
    EmployeesModule, // ← Ajouter cette ligne
    JwtModule.register({
      secret: 'votre_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController], // <-- Ajouter le contrôleur ici
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
