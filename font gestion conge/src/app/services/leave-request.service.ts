import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LeaveRequest } from '../models/leave-request.model';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LeaveRequestService {
  private apiUrl = 'http://localhost:3000/leave-requests';



  constructor(
    private http: HttpClient,
    private authService: AuthService // Injection du service d'auth
  ) {}

  // 📌 Récupérer toutes les demandes
  getLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // 📌 Ajouter une nouvelle demande
  addLeaveRequest(request: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(this.apiUrl, request).pipe(
      catchError(this.handleError)
    );
  }

  // 📌 Modifier une demande existante
  updateLeaveRequest(id: number, request: Partial<LeaveRequest>): Observable<LeaveRequest> {
    return this.http.patch<LeaveRequest>(`${this.apiUrl}/${id}`, request).pipe(
      catchError(this.handleError)
    );
  }

  // 📌 Supprimer une demande
  deleteLeaveRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // 📌 Gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    console.error('Erreur API:', error);
    return throwError(() => new Error('Erreur lors de la communication avec le serveur.'));
  }

  // leave-request.service.ts
getMyRequests(employeeId: number): Observable<LeaveRequest[]> {
  return this.http.get<LeaveRequest[]>(`/my-requests?employeeId=${employeeId}`);
}
// leave-request.service.ts
getEmployeeRequests(): Observable<LeaveRequest[]> {
 
  const employeeId = this.authService.currentUserValue?.id;
  const token = this.authService.getToken();

  if (!employeeId || !token) {
    return throwError(() => new Error('Utilisateur non connecté'));
  }

  // URL corrigée : NE PAS rajouter 'leave-requests' ici
  return this.http.get<LeaveRequest[]>(
    `${this.apiUrl}/my-requests`, // ✅ /leave-requests/my-requests
    {
      params: { employeeId: employeeId.toString() },
      headers: { Authorization: `Bearer ${token}` }
    }
  ).pipe(
    catchError(error => {
      console.error('Erreur API:', error);
      return throwError(() => new Error('Erreur serveur'));
    })
  );
}

// eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
getLeaveTypes(): Observable<{ id: number; name: string }[]> {
  return this.http.get<{ id: number; name: string }[]>('http://localhost:3000/leave-types');
}

// leave-request.service.ts
create(request: Partial<LeaveRequest>): Observable<LeaveRequest> {
  return this.http.post<LeaveRequest>(
    `${this.apiUrl}`, // URL pour créer une demande
    request,
    {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    }
  );
}

getLeaveHistory(employeeId: number): Observable<{ month: string, days: number }[]> {
  return this.http.get<{ month: string, days: number }[]>(
    `${this.apiUrl}/history`,
    {
      params: { employeeId: employeeId.toString() },
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    }
  );
}
getLeaveBalance(employeeId: number): Observable<{ remainingDays: number }> {
  return this.http.get<{ remainingDays: number }>(
    `http://localhost:3000/leave-balances`, // 👈 Endpoint corrigé
    {
      params: { employeeId: employeeId.toString() },
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    }
  );
}
// Récupérer le nombre d'employés absents aujourd'hui
// Récupérer le nombre d'employés absents aujourd'hui
getAbsentEmployeesToday(): Observable<number> {
  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
  return this.http.get<LeaveRequest[]>(this.apiUrl).pipe(
    map((requests: LeaveRequest[]) => {
      // Filtrer les demandes approuvées et incluant aujourd'hui
      const absentToday = requests.filter(request => {
        const startDate = new Date(request.date_debut);
        const endDate = new Date(request.date_fin);
        const todayDate = new Date(today);
        return (
          request.statut === 'approuvé' && // Seulement les demandes approuvées
          startDate <= todayDate && todayDate <= endDate // Aujourd'hui dans la période
        );
      });
      return absentToday.length; // Retourner le nombre d'employés absents
    }),
    catchError(this.handleError)
  );
}
getTakenDaysCurrentYear(employeeId: number): Observable<number> {
  const currentYear = new Date().getFullYear();
  
  return this.http.get<LeaveRequest[]>(`${this.apiUrl}`, {
    params: { 
      employeeId: employeeId.toString(),
      statut: 'approuvé'
    }
  }).pipe(
    map(requests => {
      return requests.reduce((total, request) => {
        const start = new Date(request.date_debut);
        const end = new Date(request.date_fin);
        
        // Vérifie si la demande est dans l'année en cours
        if (start.getFullYear() === currentYear) {
          // Calcule la durée en jours
          const timeDiff = end.getTime() - start.getTime();
          return total + Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 pour inclure le jour de début
        }
        return total;
      }, 0);
    })
  );
}

}