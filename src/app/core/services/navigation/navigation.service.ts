import { appRoute } from '@/app/shared/constants/routes';
import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private activatedRoute = inject(ActivatedRoute);

  private router = inject(Router);

  public isMainPage = signal(false);

  public queryParams = signal<Record<string, string>>({ id: '', q: '' });

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.isMainPage.set(this.router.url.split('?')[0] === appRoute.MAIN);
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      const { id, q } = params;
      if (typeof id === 'string') {
        this.queryParams.set({ id });
      }

      if (typeof q === 'string') {
        this.queryParams.set({ q });
      }
    });
  }
}
