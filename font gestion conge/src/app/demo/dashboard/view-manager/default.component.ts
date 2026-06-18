import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importation des modules et composants nécessaires
import { SharedModule } from 'src/app/theme/shared/shared.module';
//import { BajajChartComponent } from 'src/app/theme/shared/components/apexchart/bajaj-chart/bajaj-chart.component';
//import { BarChartComponent } from 'src/app/theme/shared/components/apexchart/bar-chart/bar-chart.component';
//import { ChartDataMonthComponent } from 'src/app/theme/shared/components/apexchart/chart-data-month/chart-data-month.component';
import { ChartViewAdminComponent} from 'src/app/theme/shared/components/apexchart/chart-view-admin/chart-view-admin.component';
import { CompteEmployeService } from 'src/app/services/compte-employe.service';
import { Employee } from 'src/app/models/employee.model';
import { LeaveRequest } from 'src/app/models/leave-request.model';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, ChartViewAdminComponent, SharedModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  totalEmployees = 0;
  totalLeaveRequests = 0; 
  approvedLeaveRequests = 0;
  rejectedLeaveRequests = 0;
  
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
    private employeeService: CompteEmployeService,
    private leaveRequestService: LeaveRequestService
  ) {}

  ngOnInit(): void {
    this.loadEmployeeCount();
    this.loadLeaveRequestStats();
  }

  // Récupération du nombre total d'employés
  loadEmployeeCount(): void {
    this.employeeService.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.totalEmployees = employees.length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des employés', error);
      }
    );
  }

  // Récupération des statistiques sur les demandes de congé
  loadLeaveRequestStats(): void {
    this.leaveRequestService.getLeaveRequests().subscribe(
      (leaveRequests: LeaveRequest[]) => {
        this.totalLeaveRequests = leaveRequests.length;
        this.approvedLeaveRequests = leaveRequests.filter(lr => lr.statut === 'approuvé').length;
        this.rejectedLeaveRequests = leaveRequests.filter(lr => lr.statut === 'refusé').length;

        // Mise à jour du graphique
        this.chartOptions.series = [
          { name: 'Congés Autorisés', data: [this.approvedLeaveRequests] },
          { name: 'Congés Refusés', data: [this.rejectedLeaveRequests] }
        ];
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes de congé', error);
      }
    );
  }
}
