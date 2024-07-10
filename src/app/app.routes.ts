import { Routes } from '@angular/router';

import { appPath, appRoute } from './shared/constants/routes';

export const routes: Routes = [
  { path: appPath.DEFAULT, pathMatch: 'full', redirectTo: appRoute.MAIN },
  {
    loadComponent: () => import('./youtube/pages/main-page/main-page.component').then((m) => m.MainPageComponent),
    path: appPath.MAIN,
    title: appPath.MAIN,
  },
  {
    loadComponent: () =>
      import('./youtube/pages/detailed-info-page/detailed-info-page.component').then(
        (m) => m.DetailedInfoPageComponent,
      ),
    path: appPath.DETAILED,
    title: appPath.DETAILED,
  },
  {
    loadComponent: () => import('./auth/pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
    path: appPath.LOGIN,
    title: appPath.LOGIN,
  },
  {
    loadComponent: () => import('./core/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
    path: appPath.NOT_FOUND,
    title: appPath.NOT_FOUND,
  },
  { path: appPath.NO_MATCH, redirectTo: appRoute.NOT_FOUND },
];
