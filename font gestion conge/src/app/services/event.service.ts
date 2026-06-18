import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarEvent } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/holiday-days';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<CalendarEvent[]> {
    console.log('Appel HTTP GET à:', this.apiUrl);
    return this.http.get<{ id: number; nom: string; date: string; est_férié: boolean }[]>(this.apiUrl).pipe(
      map(events => {
        console.log('Données brutes du backend:', events);
        const mappedEvents = events.map(event => {
          const rawDate = event.date;
          const eventDate = new Date(rawDate);
          if (isNaN(eventDate.getTime())) {
            console.error(`Date invalide pour l'événement ${event.nom}: ${rawDate}`);
            return null;
          }
          const mappedEvent = {
            id: event.id,
            title: event.nom,
            date: rawDate, // Conserve la date brute pour éviter des conversions inutiles
            est_ferie: event.est_férié
          };
          console.log('Événement après mapping:', mappedEvent);
          return mappedEvent;
        }).filter(event => event !== null) as CalendarEvent[];
        return mappedEvents;
      })
    );
  }

  addEvent(event: CalendarEvent): Observable<CalendarEvent> {
    const payload = {
      nom: event.title,
      date: event.date,
      est_férié: event.est_ferie ?? true
    };
    console.log('Payload envoyé au backend:', payload);
    return this.http.post<{ id: number; nom: string; date: string; est_férié: boolean }>(this.apiUrl, payload).pipe(
      map(newEvent => {
        const mappedEvent = {
          id: newEvent.id,
          title: newEvent.nom,
          date: new Date(newEvent.date).toISOString().split('T')[0],
          est_ferie: newEvent.est_férié
        };
        console.log('Nouvel événement mappé:', mappedEvent);
        return mappedEvent;
      })
    );
  }
}