/* eslint-disable no-console */
import { LoggerService } from '@/app/core/services/logger.service';
import { appRoute } from '@/app/shared/constants/routes';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login-form',
  styleUrls: ['./login-form.component.scss'],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);

  private logger = inject(LoggerService);

  private router = inject(Router);

  public hidePassword = true;

  public loginForm: FormGroup;

  public loginService = inject(LoginService);

  public constructor() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required.bind(this)],
      password: ['', Validators.required.bind(this)],
    });
  }

  public async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        const userName: unknown = this.loginForm.get('name')?.value;
        if (typeof userName === 'string') {
          this.loginService.login(userName);
          this.logger.logMessage(`User ${userName} logged in`);
          await this.router.navigate([appRoute.MAIN]);
        }
      } catch (error) {
        console.error(error); // TBD: replace with user message
      }
    }
  }

  public togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
