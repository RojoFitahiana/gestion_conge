import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importation des modules et composants nécessaires
import { SharedModule } from 'src/app/theme/shared/shared.module';
//import { BajajChartComponent } from 'src/app/theme/shared/components/apexchart/bajaj-chart/bajaj-chart.component';
//import { BarChartComponent } from 'src/app/theme/shared/components/apexchart/bar-chart/bar-chart.component';
//import { ChartDataMonthComponent } from 'src/app/theme/shared/components/apexchart/chart-data-month/chart-data-month.component';
import { ChartViewEmployeComponent} from 'src/app/theme/shared/components/apexchart/chart-view-employe/chart-view-employe.component';
//import { CompteEmployeService } from 'src/app/services/compte-employe.service';
//import { Employee } from 'src/app/models/employee.model';
import { LeaveRequest } from 'src/app/models/leave-request.model';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
//import { ApexOptions } from 'ng-apexcharts';
import { AuthService } from 'src/app/services/auth.service';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule,ChartViewEmployeComponent, SharedModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})// default.component.ts
export class DefaultComponent implements OnInit {
  absentToday = 0;
  remainingDays = 0;
  pendingRequests = 0;
  myRequests: LeaveRequest[] = [];
  leaveHistory: { month: string, days: number }[] = [];
  approvedLeaveRequests = 0;
  takenDays = 0; // Nouvelle propriété
    // Données pour le graphique
    chartOptions: ApexOptions = {
      chart: {
        type: 'bar'
      },
      xaxis: {
        categories: ['Congés']
      },
      colors: ['#007bff', '#dc3545'],
      series: []
    };
  

  constructor(
    private authService: AuthService,
    private leaveRequestService: LeaveRequestService
  ) {}

  ngOnInit(): void {
    this.loadLeaveRequestStats();
    this.loadTakenDays();
    const employeeId = this.authService.currentUserValue?.id;
    if (!employeeId) return;

    // Récupération des demandes de l'employé
    this.leaveRequestService.getEmployeeRequests().subscribe(
      (requests) => {
        this.myRequests = requests;
        this.pendingRequests = requests.filter(r => r.statut === 'en_attente').length;
      }
    );

    // Récupération du solde de congés
    this.leaveRequestService.getLeaveBalance(employeeId).subscribe(
      (balance) => this.remainingDays = balance.remainingDays
    );
  // Récupération du solde de congés
    this.leaveRequestService.getLeaveBalance(employeeId).subscribe({
      next: (balance) => {
        // Si le backend renvoie un tableau, prenez le premier élément
        this.remainingDays = Array.isArray(balance) ? balance[0]?.remainingDays || 0 : balance.remainingDays;
      },
      error: (err) => console.error('Erreur lors du chargement du solde', err)
    });

    // Récupération du nombre d'employés absents aujourd'hui
    this.leaveRequestService.getAbsentEmployeesToday().subscribe({
      next: (count) => {
        this.absentToday = count; // Mise à jour avec le nombre d'absents
      },
      error: (err) => console.error('Erreur lors du chargement des absents', err)
    });
  }
  loadLeaveRequestStats(): void {
    this.leaveRequestService.getLeaveRequests().subscribe(
      (leaveRequests: LeaveRequest[]) => {
        this.approvedLeaveRequests = leaveRequests.filter(lr => lr.statut === 'approuvé').length;
  
        // Mise à jour du graphique
        this.chartOptions.series = [
          { name: 'Congés Autorisés', data: [this.approvedLeaveRequests] },
        ];
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes de congé', error);
      }
    );
  }
  private loadTakenDays(): void {
    const employeeId = this.authService.currentUserValue?.id;
    if (!employeeId) return;

    this.leaveRequestService.getTakenDaysCurrentYear(employeeId).subscribe({
      next: (days) => this.takenDays = days,
      error: (err) => console.error('Erreur chargement jours utilisés', err)
    });
  }
  }
