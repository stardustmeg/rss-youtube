import { CustomLinkComponent } from '@/app/shared/components/custom-link/custom-link.component';
import { appRoute } from '@/app/shared/constants/routes';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginService } from '../../services/login/login.service';

@Component({
  imports: [CustomLinkComponent, RouterLink, CommonModule],
  selector: 'app-user',
  standalone: true,
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, OnDestroy {
  private loginSubscription: Subscription | undefined;

  isLoggedIn!: boolean;

  userName: null | string = null;

  // TBD: check double init of user component

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  getIcon(): string {
    return this.isLoggedIn ? 'logout' : 'account_circle';
  }

  async handleClick(): Promise<void> {
    if (this.isLoggedIn) {
      this.loginService.logout();
      await this.router.navigate([appRoute.LOGIN]);
    }
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loginSubscription = this.loginService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.cdr.detectChanges(); // TBD: check false to true
      this.setUserName();
    });
  }

  setUserName(): void {
    this.userName = this.loginService.getUserName();
  }
}
