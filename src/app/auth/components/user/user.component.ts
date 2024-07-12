import { CustomLinkComponent } from '@/app/shared/components/custom-link/custom-link.component';
import { appRoute } from '@/app/shared/constants/routes';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { LoginService } from '../../services/login/login.service';
import { logoOption } from './constants/logo-options';

@Component({
  imports: [CustomLinkComponent, RouterLink, CommonModule],
  selector: 'app-user',
  standalone: true,
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})
export class UserComponent {
  @Input() isLoggedIn = false;

  userName: null | string = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
    this.setUserName();
  }

  getIcon(): string {
    return this.isLoggedIn ? logoOption.LOGOUT : logoOption.USER;
  }

  async handleClick(): Promise<void> {
    if (this.isLoggedIn) {
      this.loginService.logout();
      await this.router.navigate([appRoute.LOGIN]);
    }
  }

  setUserName(): void {
    this.userName = this.loginService.getUserName();
  }
}
