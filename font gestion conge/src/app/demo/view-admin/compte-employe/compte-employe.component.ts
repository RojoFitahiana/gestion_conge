import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompteEmployeService } from '../../../services/compte-employe.service';
import { Employee } from '../../../models/employee.model';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeFormData } from '../employee-form/employee-form-data.interface';

@Component({
  selector: 'app-compte-employe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compte-employe.component.html',
  styleUrl: './compte-employe.component.scss',
})
export class CompteEmployeComponent implements OnInit {
  employees: Employee[] = []; // Tableau pour stocker les employés
  loading = true; // Indicateur de chargement
  error = false; // Indicateur d'erreur
  isEditMode = false; // Indique si on est en mode édition
  selectedEmployee: EmployeeFormData | null = null; // Stocke l'employé sélectionné pour modification


  constructor(private compteEmployeService: CompteEmployeService,
  private dialog: MatDialog // Injectez MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees(); // Chargez les employés au démarrage du composant
  }

  // Méthode pour charger les employés
  loadEmployees(): void {
    console.log('Chargement des employés...');
    this.compteEmployeService.getEmployees().subscribe(
      (data) => {
        console.log('Données reçues :', data);
        this.employees = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des employés', error);
        this.loading = false;
        this.error = true;
      }
    );
  }

  // Méthode pour gérer la modification
  onEditClick(employee: Employee): void {
    console.log('Modifier l\'employé :', employee);
    
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '600px',
      data: { ...employee }, // Passe les données de l'employé sélectionné
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Employé modifié :', result);
        this.compteEmployeService.updateEmployee(employee.id, result).subscribe(
          (response) => {
            console.log('Employé mis à jour avec succès :', response);
            this.loadEmployees(); // Recharge la liste après modification
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de l\'employé', error);
          }
        );
      }
    });
  }
  

  // Méthode pour gérer la suppression
  onDeleteClick(employee: Employee): void {
    const confirmation = confirm(`Voulez-vous vraiment supprimer ${employee.nom} ${employee.prenom} ?`);
    if (confirmation) {
      console.log('Supprimer l\'employé :', employee);
      // Ajoutez ici la logique pour supprimer l'employé (appel API, etc.)
      this.compteEmployeService.deleteEmployee(employee.id).subscribe(
        () => {
          console.log('Employé supprimé avec succès');
          this.loadEmployees(); // Rechargez la liste après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression', error);
        }
      );
    }
  }
 // Méthode pour ouvrir le modal d'ajout
 onAddNewEmployee(): void {
  const dialogRef = this.dialog.open(EmployeeFormComponent, {
    width: '600px',
    data: {} as EmployeeFormData, // Passez des données vides pour l'ajout
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      console.log('Nouvel employé ajouté :', result);
      this.compteEmployeService.addEmployee(result).subscribe(
        (response) => {
          console.log('Employé ajouté avec succès :', response);
          this.loadEmployees(); // Rechargez la liste après ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'employé', error);
        }
      );
    }
  });
}
}