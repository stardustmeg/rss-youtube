import { appRoute } from '@/app/shared/constants/routes';
import { Injectable, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private router = inject(Router);

  public isMainPage = signal(false);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.isMainPage.set(this.router.url.split('?')[0] === appRoute.MAIN);
    });
  }
}
