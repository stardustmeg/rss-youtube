import { UserComponent } from '@/app/auth/components/user/user.component';
import { LoginService } from '@/app/auth/services/login/login.service';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { CustomLinkComponent } from '@/app/shared/components/custom-link/custom-link.component';
import { appRoute } from '@/app/shared/constants/routes';
import { FilterComponent } from '@/app/youtube/components/filter/filter.component';
import { SearchComponent } from '@/app/youtube/components/search/search.component';
import { SortComponent } from '@/app/youtube/components/sort/sort.component';
import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    SearchComponent,
    SortComponent,
    UserComponent,
    CustomButtonComponent,
    CustomLinkComponent,
    FilterComponent,
    AsyncPipe,
  ],
  selector: 'app-header',
  standalone: true,
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router = inject(Router);

  private routerSubscription: Subscription | undefined;

  public isMainPage = false;

  public isSortVisible = false;

  public loginService = inject(LoginService);

  public constructor() {}

  private checkIfMainPage(): void {
    this.isMainPage = this.router.url === appRoute.MAIN;
  }

  public ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  public ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkIfMainPage();
      }
    });
  }

  public toggleSortVisibility(): void {
    this.isSortVisible = !this.isSortVisible;
  }
}
