import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // Importez provideHttpClient

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // Ajoutez provideHttpClient ici
  ],
};
export class BerryConfig {
  static isCollapse_menu = false;
  static font_family = 'Roboto'; // Roboto, poppins, inter
}
