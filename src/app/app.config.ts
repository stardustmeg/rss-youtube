import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TitleStrategy, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AppTitleService } from './core/services/app-title/app-title.service';

const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    [provideRouter(routes), { provide: TitleStrategy, useClass: AppTitleService }],
    provideAnimationsAsync(),
  ],
};
export default appConfig;
