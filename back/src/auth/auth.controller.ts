// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Base path
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // Full route: POST /auth/login
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
