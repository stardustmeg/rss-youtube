import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './auth/guards/auth/auth.guard';
import { appPath, appRoute } from './shared/constants/routes';

export const routes: Routes = [
  { path: appPath.DEFAULT, pathMatch: 'full', redirectTo: appRoute.MAIN },
  {
    canActivate: [authGuard],
    loadChildren: () => import('./youtube/youtube.module').then((m) => m.YoutubeModule),
    path: appPath.MAIN,
    title: appPath.MAIN,
  },
  {
    canActivate: [authGuard],
    loadChildren: () => import('./youtube/youtube.module').then((m) => m.YoutubeModule),
    path: appPath.DETAILED,
    title: appPath.DETAILED,
  },
  {
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    path: appPath.LOGIN,
    title: appPath.LOGIN,
  },
  {
    loadChildren: () => import('./core/not-found-page/not-found.module').then((m) => m.NotFoundModule),
    path: appPath.NOT_FOUND,
    title: appPath.NOT_FOUND,
  },
  { path: appPath.NO_MATCH, redirectTo: appRoute.NOT_FOUND },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
