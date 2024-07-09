import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  {
    loadComponent: () => import('./youtube/pages/main-page/main-page.component').then((m) => m.MainPageComponent),
    path: 'main',
    title: 'Youtube | main',
  },
  {
    loadComponent: () => import('./core/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
    path: '404',
    title: 'Youtube | 404',
  },
  { path: '**', redirectTo: '/404' },
];
