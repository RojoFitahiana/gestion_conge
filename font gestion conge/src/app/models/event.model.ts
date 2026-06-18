export interface CalendarEvent {
    id?: number;
    title: string; // Correspond à "nom" dans ton entité
    date: string; // Sera converti depuis ton champ "date" (type Date)
    est_ferie?: boolean; // Optionnel si tu veux l'utiliser
  }