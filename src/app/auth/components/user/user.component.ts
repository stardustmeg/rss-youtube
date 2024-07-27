import { CustomLinkComponent } from '@/app/shared/components/custom-link/custom-link.component';
import { appRoute } from '@/app/shared/constants/routes';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { LoginService } from '../../services/login/login.service';
import { logoOption } from './constants/logo-options';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CustomLinkComponent, RouterLink, CommonModule],
  selector: 'app-user',
  standalone: true,
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  private router = inject(Router);

  @Input() public isLoggedIn: boolean | null = false;

  public loginService = inject(LoginService);

  public constructor() {}

  public getIcon(): string {
    return this.isLoggedIn ? logoOption.LOGOUT : logoOption.USER;
  }

  public getUserName(): null | string {
    return this.loginService.getUserName();
  }

  public handleClick(): void {
    if (this.isLoggedIn) {
      this.loginService.logout();
    }
    this.router.navigate([appRoute.LOGIN]);
  }

  public ngOnInit(): void {
    this.loginService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
