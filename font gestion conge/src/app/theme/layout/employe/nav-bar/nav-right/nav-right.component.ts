import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; // Import du service
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-nav-right',
  standalone: true, // Ajouté si vous utilisez des composants standalone
  imports: [RouterModule, SharedModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  authService = inject(AuthService); // Utilisation de inject() ou

  // Alternative avec constructor
 // 'public' est crucial ici // Injection du service

  logout(event: Event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    this.authService.logout();
  }
  
}