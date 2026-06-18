// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Department {
  id: number;
  nom_departement: string;
  responsable_id?: number;
}

export interface DepartmentInfo {
  departement: string;
  departementID: number;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    nom: string;
    role: string;
    departement: string;
    departementID: number;
  };
}
export interface User {
  id: number;
  email: string;
  nom: string;
  token: string;
  role: string;
  departement: string;
  departementID: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>; // Renommé pour cohérence

  private readonly apiUrl = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Initialisation avec les données du localStorage
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

 /* private getUserFromStorage(): User | null {
    try {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        const parsedData = JSON.parse(userData);
        console.log('Données utilisateur chargées:', parsedData); // Log de débogage
        return parsedData;
      }
      return null;
    } catch (error) {
      console.error('Erreur de parsing:', error);
      return null;
    }
  }*/

    private getUserFromStorage(): User | null {
      try {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
          const parsedData = JSON.parse(userData);
          // Vérification des propriétés essentielles
          if (parsedData.id && parsedData.token) {
            return parsedData;
          }
          console.error('Données utilisateur incomplètes:', parsedData);
          return null;
        }
        return null;
      } catch (error) {
        console.error('Erreur de parsing:', error);
        return null;
      }
    }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

 
  login(email: string, password: string): Observable<User> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          const authenticatedUser: User = {
            id: response.user.id,
            email: response.user.email,
            nom: response.user.nom,
            token: response.token,
            role: response.user.role,
            departement: response.user.departement,
            departementID: response.user.departementID
          };
  
          localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
          this.currentUserSubject.next(authenticatedUser);
          return authenticatedUser;
        }),
  
        catchError((error: HttpErrorResponse) => {
          const errorMsg = error.error?.message || 'Erreur de connexion au serveur';
          console.error('Erreur détaillée:', error);
          return throwError(() => new Error(errorMsg));
        })
      );
  }
  
 

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue?.token;
  }

  getToken(): string | null {
    return this.currentUserValue?.token || null;
  }

  hasRole(role: string): boolean {
    return this.currentUserValue?.role === role;
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  isEmployee(): boolean {
    return this.hasRole('employee');
  }

  isManager(): boolean {
    return this.hasRole('manager')
  }
}

