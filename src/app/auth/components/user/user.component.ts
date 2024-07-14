import { LocalStorageService } from '@/app/core/services/local-storage/local-storage.service';
import { appRoute } from '@/app/shared/constants/routes';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

import { LOGIN_KEY } from '../../services/login/constants/login-key';
import { LoginService } from '../../services/login/login.service';
import { logoOption } from './constants/logo-options';

@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})
export class UserComponent {
  private router = inject(Router);

  @Input() public isLoggedIn = false;

  public localStorageService = inject(LocalStorageService);

  public loginService = inject(LoginService);

  public constructor() {}

  public getIcon(): string {
    return this.isLoggedIn ? logoOption.LOGOUT : logoOption.USER;
  }

  public getUserName(): null | string {
    return this.localStorageService.getUserName(LOGIN_KEY);
  }

  public async handleClick(): Promise<void> {
    if (this.isLoggedIn) {
      this.loginService.logout();
      await this.router.navigate([appRoute.LOGIN]);
    } else {
      await this.router.navigate([appRoute.LOGIN]);
    }
  }
}
