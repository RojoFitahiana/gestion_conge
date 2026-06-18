import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // Importation des options de FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin pour la vue en grille
import interactionPlugin from '@fullcalendar/interaction'; // Plugin pour les interactions
import { FullCalendarModule } from '@fullcalendar/angular'; // Importation de FullCalendarModule
import frLocale from '@fullcalendar/core/locales/fr'; // Importation de la localisation française

@Component({
  selector: 'app-calendrier',
  standalone: true, // Déclare ce composant comme autonome
  imports: [FullCalendarModule], // Importe FullCalendarModule directement ici
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent {

  // Options de configuration pour FullCalendar
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // Vue initiale : mois
    plugins: [dayGridPlugin, interactionPlugin], // Plugins utilisés
    weekends: true, // Afficher les weekends
    editable: true, // Permettre la modification des événements
    selectable: true, // Permettre la sélection de dates
    dateClick: this.handleDateClick.bind(this), // Gestionnaire de clic sur une date
    events: [
      { title: 'Événement 1', date: '2023-10-01' },
      { title: 'Événement 2', date: '2023-10-12' }
    ], // Événements à afficher
    locale: frLocale, // Utilisation de la localisation française
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    buttonText: {
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour'
    }
  };

  // Méthode pour gérer le clic sur une date
  handleDateClick(arg: { dateStr: string; date: Date; view: { type: string; title: string } }) {
    alert('Date cliquée: ' + arg.dateStr);
    console.log('Type de vue:', arg.view.type);
    console.log('Titre de la vue:', arg.view.title);
  }
}