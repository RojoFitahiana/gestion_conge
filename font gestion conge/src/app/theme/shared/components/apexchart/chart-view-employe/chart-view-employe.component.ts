import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule, ApexOptions } from 'ng-apexcharts';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chart-view-employe',
  imports: [NgApexchartsModule],
  templateUrl: './chart-view-employe.component.html',
  styleUrls: ['./chart-view-employe.component.scss'],
  standalone: true
})
export class ChartViewEmployeComponent implements OnInit {
  
  chartOptions: ApexOptions = {
    chart: { type: 'bar', height: 350 },
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
    xaxis: { categories: [] },
    colors: ['#007bff'], // Une seule couleur pour les congés approuvés
    tooltip: { y: { formatter: (val) => `${val} Congé(s) approuvé(s)` } },
    series: [
      { name: 'Congés Approuvés', data: [] }
    ]
  };

  totalApprovedLeaveRequests = 0;

  constructor(
    private leaveRequestService: LeaveRequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadApprovedLeaveRequestStats();
  }

  loadApprovedLeaveRequestStats(): void {
    const employeeId = this.authService.currentUserValue?.id;
    if (!employeeId) return;

    this.leaveRequestService.getEmployeeRequests().subscribe(
      (leaveRequests) => {
        const now = new Date();
        const last6Months = Array.from({ length: 6 }, (_, i) => {
          const date = new Date();
          date.setMonth(now.getMonth() - (5 - i)); // Les 6 derniers mois
          return date.toLocaleString('default', { month: 'short' }); // "Jan", "Fév", ...
        });

        const approvedLeaveCounts = Array(6).fill(0);

        leaveRequests.forEach((leave) => {
          const leaveDate = new Date(leave.date_debut); // Date de début du congé
          const month = leaveDate.toLocaleString('default', { month: 'short' });
          const monthIndex = last6Months.indexOf(month);

          if (monthIndex !== -1 && leave.statut === 'approuvé') {
            approvedLeaveCounts[monthIndex]++;
          }
        });

        this.chartOptions = {
          ...this.chartOptions,
          series: [
            { name: 'Congés Approuvés', data: approvedLeaveCounts }
          ],
          xaxis: { categories: last6Months }
        };

        this.totalApprovedLeaveRequests = approvedLeaveCounts.reduce((acc, val) => acc + val, 0);
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes de congé', error);
      }
    );
  }
}