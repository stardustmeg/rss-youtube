import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TitleStrategy, provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { AppTitleService } from './core/services/app-title/app-title.service';
import { appReducer } from './redux/reducers/reducers';
import { ApiInterceptorFn } from './youtube/services/http-interceptor/http-interceptor.service';

const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    [
      provideRouter(routes),
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      { provide: TitleStrategy, useClass: AppTitleService },
    ],
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([ApiInterceptorFn])),
    provideStore({ appState: appReducer }),
  ],
};
export default appConfig;
