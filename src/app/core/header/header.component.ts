import { UserComponent } from '@/app/auth/components/user/user.component';
import { LoginService } from '@/app/auth/services/login/login.service';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { CustomLinkComponent } from '@/app/shared/components/custom-link/custom-link.component';
import { FilterComponent } from '@/app/youtube/components/filter/filter.component';
import { SearchComponent } from '@/app/youtube/components/search/search.component';
import { SortComponent } from '@/app/youtube/components/sort/sort.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
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
  ],
  selector: 'app-header',
  standalone: true,
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private loginSubscription: Subscription | undefined;

  isLoggedIn = false;

  isSortVisible = false;

  constructor(private loginService: LoginService) {}

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loginSubscription = this.loginService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  toggleSortVisibility(): void {
    this.isSortVisible = !this.isSortVisible;
  }
}
