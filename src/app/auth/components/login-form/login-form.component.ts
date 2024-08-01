import { LoggerService } from '@/app/core/services/logger/logger.service';
import { appRoute } from '@/app/shared/constants/routes';
import { userMessage } from '@/app/shared/services/snackBar/constants/user-message';
import { SnackBarService } from '@/app/shared/services/snackBar/snack-bar.service';
import { stringTemplate } from '@/app/shared/utils/string-template';
import { passwordStrengthValidator } from '@/app/shared/validators/validators';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { LoginService } from '../../services/login/login.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    CustomButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatHint,
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

  private snackBar = inject(SnackBarService);

  public hidePassword = true;

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordStrengthValidator]],
  });

  public loginService = inject(LoginService);

  constructor() {}

  public onSubmit(): void {
    if (this.loginForm.valid) {
      try {
        const email: unknown = this.loginForm.get('email')?.value;
        if (typeof email === 'string') {
          this.loginService.login(email);
          this.router.navigate([appRoute.MAIN]);
          this.logger.logMessage(stringTemplate(userMessage.LOGGER_LOGIN, { email }));
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
