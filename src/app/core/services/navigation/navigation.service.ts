import { appRoute } from '@/app/shared/constants/routes';
import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public isMainPage = signal(false);
  public queryParams = signal<Record<string, string>>({});

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.isMainPage.set(this.router.url.split('?')[0] === appRoute.MAIN);
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      this.queryParams.set(params);
    });
  }

  public updateQueryParams(params: Params): void {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }
}
