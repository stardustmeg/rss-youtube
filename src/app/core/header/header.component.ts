import { LoginService } from '@/app/auth/services/login/login.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public isSortVisible = false;

  public loginService = inject(LoginService);

  public constructor() {}

  public toggleSortVisibility(): void {
    this.isSortVisible = !this.isSortVisible;
  }
}
