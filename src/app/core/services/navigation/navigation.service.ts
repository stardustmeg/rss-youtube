import { appRoute } from '@/app/shared/constants/routes';
import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private router = inject(Router);

  public isMainPage$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.isMainPage$.next(this.router.url.split('?')[0] === appRoute.MAIN);
    });
  }
}
