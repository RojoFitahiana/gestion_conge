import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importation des modules et composants nécessaires
import { SharedModule } from 'src/app/theme/shared/shared.module';
//import { BarChartComponent } from 'src/app/theme/shared/components/apexchart/bar-chart/bar-chart.component';
//import { ChartDataMonthComponent } from 'src/app/theme/shared/components/apexchart/chart-data-month/chart-data-month.component';
import { ChartViewAdminComponent} from 'src/app/theme/shared/components/apexchart/chart-view-admin/chart-view-admin.component';
import { CompteEmployeService } from 'src/app/services/compte-employe.service';
import { Employee } from 'src/app/models/employee.model';
import { LeaveRequest } from 'src/app/models/leave-request.model';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { ApexOptions } from 'ng-apexcharts';
import { LeaveTypePieChartComponent } from "../../../theme/shared/components/apexchart/bajaj-chart/leave-type-pie-chart.componenent";
import { EventService } from 'src/app/services/event.service'; // Importe ton EventService
import { CalendarEvent } from 'src/app/models/event.model'; // Importe ton interface CalendarEvent

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, ChartViewAdminComponent, SharedModule, LeaveTypePieChartComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  totalEmployees = 0;
  totalLeaveRequests = 0; 
  approvedLeaveRequests = 0;
  rejectedLeaveRequests = 0;
  upcomingEvent: { title: string; date: string } | null = null;
  
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
    private leaveRequestService: LeaveRequestService,
    private eventService: EventService // Injecte l'EventService  
  ) {}

  ngOnInit(): void {
    this.loadEmployeeCount();
    this.loadLeaveRequestStats();
    this.loadUpcomingEvent();
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

  loadUpcomingEvent(): void {
    console.log('loadUpcomingEvent appelé');
    this.eventService.getEvents().subscribe({
      next: (events: CalendarEvent[]) => {
        console.log('Événements bruts récupérés:', events);

        const now = new Date();
        now.setHours(0, 0, 0, 0); // Normalise la date actuelle à minuit
        console.log('Date actuelle normalisée:', now);

        // Filtrer les événements futurs
        const futureEvents = events
          .filter(event => {
            console.log('Événement en cours de traitement:', event);
            const eventDate = new Date(event.date);
            console.log('Date de l\'événement convertie:', eventDate);
            const isFuture = eventDate > now;
            console.log(`Est-ce un événement futur ? ${event.title}: ${eventDate} > ${now} = ${isFuture}`);
            return isFuture;
          })
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        console.log('Événements futurs après filtrage:', futureEvents);

        if (futureEvents.length > 0) {
          this.upcomingEvent = {
            title: futureEvents[0].title,
            date: futureEvents[0].date
          };
          console.log('Événement à venir sélectionné:', this.upcomingEvent);
        } else {
          console.log('Aucun événement futur trouvé');
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      },
      complete: () => {
        console.log('Récupération des événements terminée');
      }
    });
  }
}
