import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from '../../../services/leave-request.service';
import { AuthService } from '../../../services/auth.service';
import { LeaveRequest } from '../../../models/leave-request.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historique-conge',
  standalone: true, // Ajout de standalone
  imports: [CommonModule, FormsModule],
  templateUrl: './historique-conge.component.html',
  styleUrls: ['./historique-conge.component.scss']
})
export class HistoriqueCongeComponent implements OnInit {
  demandes: LeaveRequest[] = [];
  nouvelleDemande: Partial<LeaveRequest> = {};
  leaveTypes: { id: number; name: string }[] = [];
  isLoading = false;

  constructor(
    private leaveService: LeaveRequestService,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Surveillance de l'utilisateur connecté via currentUser$ (corrigé)
    this.auth.currentUser$.subscribe(user => {
      console.log('UTILISATEUR CONNECTÉ:', user); // Vérification clé
      
      if (user) {
        this.loadDemandes(); // Chargement automatique
        this.loadLeaveTypes();
      } else {
        this.demandes = [];
        this.snackBar.open('Vous devez être connecté', 'Fermer');
      }
    });
  }

  loadDemandes(): void {
    this.isLoading = true;
    
    this.leaveService.getEmployeeRequests().subscribe({
      next: (data) => {
        console.log('DONNÉES BRUTES REÇUES:', data); // Inspectez les données
        this.demandes = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        
        if (err.status === 401) {
          this.auth.logout(); // Déconnexion si token invalide
          this.snackBar.open('Session expirée', 'Fermer');
        } else {
          this.snackBar.open('Erreur serveur', 'Fermer');
        }
      }
    });
  }

  loadLeaveTypes(): void {
    this.leaveService.getLeaveTypes().subscribe({
      next: (types) => this.leaveTypes = types,
      error: () => this.snackBar.open('Erreur chargement types', 'Fermer')
    });
  }

  submitDemande(): void {
    if (!this.auth.isAuthenticated()) {
      this.snackBar.open('Connexion requise', 'Fermer');
      return;
    }
  
    const employeeId = this.auth.currentUserValue?.id;
    if (!employeeId) {
      this.snackBar.open('Erreur: ID employé non disponible', 'Fermer');
      return;
    }
  
    const request = {
      ...this.nouvelleDemande,
      employe_id: employeeId, // 👈 Correspond à votre interface
      type_conge_id: this.nouvelleDemande.type_conge_id // Assurez-vous que ce champ est bien rempli
    };

    this.leaveService.create(request).subscribe({
      next: () => {
        this.snackBar.open('Demande envoyée !', 'Fermer', { duration: 2000 });
        this.nouvelleDemande = {};
        this.loadDemandes(); // Rechargement
      },
      error: (err) => {
        const msg = err.error?.message || 'Erreur serveur';
        this.snackBar.open(`Échec : ${msg}`, 'Fermer');
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}