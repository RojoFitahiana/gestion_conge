import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const user = authService.currentUserValue;

    // Vérification de l'authentification
    if (!user) {
      return router.parseUrl('/login');
    }

    // Vérification des rôles
    if (!allowedRoles.includes(user.role)) {
      return router.parseUrl('/access-denied'); // Créer cette route
    }

    return true;
  };
};