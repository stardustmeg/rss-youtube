import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginFormComponent],
  selector: 'app-login-page',
  standalone: true,
  styleUrl: './login-page.component.scss',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {}
