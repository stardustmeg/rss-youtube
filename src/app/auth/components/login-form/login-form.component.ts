import { LoggerService } from '@/app/core/services/logger.service';
import { userMessage } from '@/app/shared/components/snack-bar/constants/user-message';
import { SnackBarComponent } from '@/app/shared/components/snack-bar/snack-bar.component';
import { appRoute } from '@/app/shared/constants/routes';
import { stringTemplate } from '@/app/shared/utils/string-template';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { LoginService } from '../../services/login/login.service';

@Component({
  imports: [
    ReactiveFormsModule,
    CustomButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    SnackBarComponent,
  ],
  selector: 'app-login-form',
  standalone: true,
  styleUrls: ['./login-form.component.scss'],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);

  private logger = inject(LoggerService);

  private router = inject(Router);

  private snackBar: SnackBarComponent = new SnackBarComponent();

  public hidePassword = true;

  public loginForm: FormGroup;

  public loginService = inject(LoginService);

  public constructor() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required.bind(this)],
      password: ['', Validators.required.bind(this)],
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      try {
        const userName: unknown = this.loginForm.get('name')?.value;
        if (typeof userName === 'string') {
          this.loginService.login(userName);
          this.router.navigate([appRoute.MAIN]);
          this.logger.logMessage(stringTemplate(userMessage.LOGGER_LOGIN, { userName }));
        }
      } catch (error) {
        this.snackBar.openSnackBar(userMessage.ERROR);
      }
    }
  }

  public togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
