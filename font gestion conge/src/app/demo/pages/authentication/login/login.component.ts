import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false) // Ajoutez cette ligne
  });

  errorMessage: string | null = null;
  loading = false;
  

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.valid && !this.loading) {
      this.loading = true;
      this.errorMessage = null;
      
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email!, password!).subscribe({
        next: (user) => {
          // Redirection basée sur le rôle
          if (user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else if (user.role === 'manager') {
            this.router.navigate(['/manager']);
          } else {
            this.router.navigate(['/employe']);
          }
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erreur de connexion';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  
}