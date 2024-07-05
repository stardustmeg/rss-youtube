import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  {
    loadComponent: () =>
      import('./pages/main-page/main-page.component').then((m) => m.MainPageComponent),
    path: 'main',
  },
  {
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
    path: '404',
  },
  { path: '**', redirectTo: '/404' },
];
