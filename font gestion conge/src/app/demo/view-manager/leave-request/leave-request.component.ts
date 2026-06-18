import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { AuthService } from 'src/app/services/auth.service'; // Ajouter l'import
import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LeaveRequest } from 'src/app/models/leave-request.model';

@Component({
  selector: 'app-leave-request-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {
  private leaveRequestsSubject = new BehaviorSubject<LeaveRequest[]>([]);
  leaveRequests$ = this.leaveRequestsSubject.asObservable();
  filteredLeaveRequests: LeaveRequest[] = [];
  loading = false;
  error: string | null = null;
  currentManagerDepartment: number | null = null; // Nouvelle variable

  constructor(
    private leaveRequestService: LeaveRequestService,
    private authService: AuthService // Ajouter le service d'authentification
  ) {}

  ngOnInit(): void {
    this.getManagerDepartment();
    this.loadLeaveRequests();
  }

  // Modifier getManagerDepartment
private getManagerDepartment(): void {
  const currentUser = this.authService.currentUserValue;
  
  if (currentUser) {
    this.currentManagerDepartment = currentUser.departementID;
    console.log('Département manager:', {
      id: currentUser.departementID,
      nom: currentUser.departement
    });
  }

  if (!this.currentManagerDepartment) {
    this.error = 'Manager non associé à un département valide';
    this.loading = false;
  }
}

// Modifier le filtre

  loadLeaveRequests(): void {
    if (!this.currentManagerDepartment) return;

    this.loading = true;
    this.error = null;

    console.log('Début du chargement des demandes...'); // Log 3

    this.leaveRequestService.getLeaveRequests().pipe(
      finalize(() => this.loading = false),
      catchError((error) => {
        console.error('Erreur lors du chargement:', error); // Log 4
        this.error = error.message || 'Impossible de récupérer les demandes.';
        return of([]);
      })
    ).subscribe(data => {
      console.log('Données brutes reçues:', data); // Log 5
      
      this.filteredLeaveRequests = data.filter(request => {
        console.log('Vérification demande:', { // Log 6
          id: request.id,
          statut: request.statut,
          departement: request.employe?.departement?.id,
          managerDepartment: this.currentManagerDepartment
        });
        
        return request.statut === 'en_attente' &&
               request.employe?.departement?.id === this.currentManagerDepartment;
      });

      console.log('Demandes filtrées:', this.filteredLeaveRequests); // Log 7
      this.leaveRequestsSubject.next(data);
    });
  }


  approveRequest(request: LeaveRequest): void {
    const updatedRequest = { ...request, statut: 'approuvé' };
    this.updateRequest(updatedRequest);
  }

  rejectRequest(request: LeaveRequest): void {
    const updatedRequest = { ...request, statut: 'refusé' };
    this.updateRequest(updatedRequest);
  }

  private updateRequest(updatedRequest: LeaveRequest): void {
    this.leaveRequestService.updateLeaveRequest(updatedRequest.id, updatedRequest).subscribe({
      next: () => this.loadLeaveRequests(),
      error: (error) => console.error('Erreur lors de la mise à jour:', error)
    });
  }
}