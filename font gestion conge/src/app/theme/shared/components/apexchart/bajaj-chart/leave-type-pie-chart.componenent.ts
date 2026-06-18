import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule, ApexOptions } from 'ng-apexcharts';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { LeaveRequest } from 'src/app/models/leave-request.model';

@Component({
  selector: 'app-leave-type-pie-chart',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './leave-type-pie-chart.component.html',
  styleUrls: ['./leave-type-pie-chart.component.scss']
})
export class LeaveTypePieChartComponent implements OnInit {
  chartOptions: ApexOptions | undefined;
  leaveTypes: { id: number; name: string }[] = [];
  leaveRequests: LeaveRequest[] = [];

  constructor(private leaveRequestService: LeaveRequestService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      console.log('Début du chargement des données');
      const [types, requests] = await Promise.all([
        this.leaveRequestService.getLeaveTypes().toPromise(),
        this.leaveRequestService.getLeaveRequests().toPromise()
      ]);

      console.log('Types de congé récupérés :', types);
      console.log('Demandes de congé récupérées (brutes) :', requests);

      this.leaveTypes = types || [];
      this.leaveRequests = (requests || []).filter(request => request.statut === 'approuvé');

      console.log('Types après affectation :', this.leaveTypes);
      console.log('Demandes approuvées après filtre (complètes) :', JSON.stringify(this.leaveRequests, null, 2));

      this.updateChart();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  }

  updateChart(): void {
    console.log('Début de updateChart');

    if (this.leaveTypes.length === 0 || this.leaveRequests.length === 0) {
      console.warn('Données manquantes pour générer le graphique');
      return;
    }

    // Log des IDs pour déboguer
    console.log('IDs des types de congé (leaveTypes) :', this.leaveTypes.map(t => t.id));
    console.log('type_conge_id ou type_conge.id des demandes approuvées :', 
      this.leaveRequests.map(r => r.type_conge_id || r.type_conge?.id));

    const typeCounts = this.leaveTypes.map(type => {
      const count = this.leaveRequests.filter(request => {
        const requestTypeId = request.type_conge_id || request.type_conge?.id;
        return requestTypeId === type.id;
      }).length;
      return { name: type.name, count };
    });
    console.log('Comptes par type :', typeCounts);

    const totalApproved = this.leaveRequests.length;
    console.log('Total des demandes approuvées :', totalApproved);

    if (totalApproved === 0) {
      console.warn('Aucune demande approuvée');
      return;
    }

    const series = typeCounts.map(type => (type.count / totalApproved) * 100);
    const labels = typeCounts.map(type => type.name);

    console.log('Séries calculées :', series);
    console.log('Labels calculés :', labels);

    this.chartOptions = {
      chart: { type: 'pie', height: 350 },
      series,
      labels,
      colors: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#17a2b8'],
      tooltip: { y: { formatter: (val) => `${val.toFixed(2)}%` } },
      legend: { position: 'bottom' }
    };
    console.log('chartOptions défini :', this.chartOptions);
  }
}