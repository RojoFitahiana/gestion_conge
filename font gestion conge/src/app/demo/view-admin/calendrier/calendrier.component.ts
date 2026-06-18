import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';
import { EventService } from '../../../services/event.service';
import { CalendarEvent } from '../../../models/event.model';

@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {
  calendarOptions: CalendarOptions;

  constructor(private eventService: EventService) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      weekends: true,
      editable: true,
      selectable: true,
      dateClick: this.handleDateClick.bind(this),
      locale: frLocale,
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
      },
      events: [] as EventInput[] // Initialisé comme tableau vide compatible avec FullCalendar
    };
  }

  ngOnInit() {
    // Charger les événements dynamiquement depuis le backend
    this.eventService.getEvents().subscribe(events => {
      // On mappe CalendarEvent[] vers EventInput[] pour FullCalendar
      this.calendarOptions.events = events.map(event => ({
        id: event.id?.toString(),
        title: event.title,
        date: event.date,
        extendedProps: {
          est_ferie: event.est_ferie
        }
      }));
    });
  }

  // Méthode pour gérer le clic sur une date (ajout d'événement)
  handleDateClick(arg: { dateStr: string; date: Date; view: { type: string; title: string } }) {
    const title = prompt('Entrez le nom de l\'événement :');
    if (title) {
      const newEvent: CalendarEvent = {
        title,
        date: arg.dateStr,
        est_ferie: true
      };
      this.eventService.addEvent(newEvent).subscribe(event => {
        // Ajoute le nouvel événement au tableau existant
        const currentEvents = (this.calendarOptions.events || []) as EventInput[];
        this.calendarOptions.events = [
          ...currentEvents,
          {
            id: event.id?.toString(),
            title: event.title,
            date: event.date,
            extendedProps: {
              est_ferie: event.est_ferie
            }
          }
        ];
      });
    }
  }
}