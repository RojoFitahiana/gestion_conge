import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule, ApexOptions } from 'ng-apexcharts';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { CommonModule } from '@angular/common'; // Ajouté pour *ngIf

@Component({
  selector: 'app-chart-view-admin',
  imports: [NgApexchartsModule, CommonModule ],
  templateUrl: './chart-view-admin.component.html',
  styleUrls: ['./chart-view-admin.component.scss']
})
export class ChartViewAdminComponent implements OnInit {
  

  chartOptions: ApexOptions | undefined;
  totalLeaveRequests = 0;

  constructor(private leaveRequestService: LeaveRequestService) {}

  ngOnInit(): void {
    this.loadLeaveRequestStats();
  }

  loadLeaveRequestStats(): void {
    this.leaveRequestService.getLeaveRequests().subscribe(
      (leaveRequests) => {
        const now = new Date();
        const last6Months = Array.from({ length: 6 }, (_, i) => {
          const date = new Date();
          date.setMonth(now.getMonth() - (5 - i)); // Obtenir le mois précédent
          return date.toLocaleString('default', { month: 'short' }); // "Jan", "Feb", ...
        });

        const approvedLeaveCounts = Array(6).fill(0);
        const rejectedLeaveCounts = Array(6).fill(0);

        leaveRequests.forEach((leave) => {
          const leaveDate = new Date(leave.date_debut); // Convertir en objet Date
          const month = leaveDate.toLocaleString('default', { month: 'short' });

          const monthIndex = last6Months.indexOf(month);
          if (monthIndex !== -1) {
            if (leave.statut === 'approuvé') {
              approvedLeaveCounts[monthIndex]++;
            } else if (leave.statut === 'refusé') {
              rejectedLeaveCounts[monthIndex]++;
            }
          }
        });

       // Définition complète de chartOptions avec les données chargées
        this.chartOptions = {
          chart: { type: 'bar', height: 287 },
          dataLabels: { enabled: false },
          plotOptions: {
            bar: { borderRadius: 10, horizontal: false, columnWidth: '55%' }
          },
          responsive: [
            {
              breakpoint: 480,
              options: { chart: { height: 300 }, legend: { position: 'bottom' } }
            }
          ],
          xaxis: { categories: last6Months },
          colors: ['#007bff', '#dc3545'],
          tooltip: { y: { formatter: (val) => `${val} Congé(s)` } },
          series: [
            { name: 'Congés Autorisés', data: approvedLeaveCounts },
            { name: 'Congés Refusés', data: rejectedLeaveCounts }
          ]
        };

        this.totalLeaveRequests = leaveRequests.length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes de congé', error);
      }
    );
  }
}
