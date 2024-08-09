import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  TitleStrategy,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { AppTitleService } from './core/services/app-title/app-title.service';
import { VideoEffects } from './redux/effects/effects';
import { appReducer } from './redux/reducers/reducers';
import { ApiInterceptorFn } from './youtube/services/http-interceptor/http-interceptor.service';

const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    [
      provideRouter(routes, withComponentInputBinding()),
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      { provide: TitleStrategy, useClass: AppTitleService },
    ],
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([ApiInterceptorFn])),
    provideStore({ appState: appReducer }),
    provideEffects([VideoEffects]),
  ],
};
export default appConfig;
