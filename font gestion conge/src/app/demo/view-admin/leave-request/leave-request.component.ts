import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
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
  filteredLeaveRequests: LeaveRequest[] = []; // Demandes filtrées
  loading = false;
  error: string | null = null;

  constructor(private leaveRequestService: LeaveRequestService) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
    this.loading = true;
    this.error = null;

    this.leaveRequestService.getLeaveRequests().pipe(
      finalize(() => this.loading = false),
      catchError((error) => {
        console.error('Erreur lors du chargement:', error);
        this.error = error.message || 'Impossible de récupérer les demandes.';
        return of([]);
      })
    ).subscribe(data => {
      // Filtrez les demandes en attente
      this.filteredLeaveRequests = data.filter(request => request.statut === 'en_attente');
      this.leaveRequestsSubject.next(data);
    });
  }

  approveRequest(request: LeaveRequest): void {
    const updatedRequest = { ...request, statut: 'approuvé' };
    this.leaveRequestService.updateLeaveRequest(updatedRequest.id, updatedRequest).subscribe(
      () => this.loadLeaveRequests(), // Rechargez les demandes
      error => console.error('Erreur lors de l\'approbation:', error)
    );
  }

  rejectRequest(request: LeaveRequest): void {
    const updatedRequest = { ...request, statut: 'refusé' };
    this.leaveRequestService.updateLeaveRequest(updatedRequest.id, updatedRequest).subscribe(
      () => this.loadLeaveRequests(), // Rechargez les demandes
      error => console.error('Erreur lors du refus:', error)
    );
  }
}