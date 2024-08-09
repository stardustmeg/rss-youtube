import { LoggerService } from '@/app/core/services/logger/logger.service';
import { appRoute } from '@/app/shared/constants/routes';
import { userMessage } from '@/app/shared/services/snackBar/constants/user-message';
import { SnackBarService } from '@/app/shared/services/snackBar/snack-bar.service';
import { stringTemplate } from '@/app/shared/utils/string-template';
import { passwordStrengthValidator } from '@/app/shared/validators/validators';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { merge } from 'rxjs';

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

  public errorMessage = signal('');

  public hidePassword = signal(true);

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordStrengthValidator]],
  });

  public loginService = inject(LoginService);

  constructor() {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl) {
      merge(passwordControl.valueChanges, passwordControl.statusChanges).subscribe(() => {
        const errors = passwordControl.errors;
        if (this.isPasswordStrengthErrors(errors)) {
          this.updateErrorMessage(errors.passwordStrength);
        }
      });
    }
  }

  private isPasswordStrengthErrors(
    errors: ValidationErrors | null,
  ): errors is { passwordStrength: Record<string, string> } {
    return errors !== null && typeof errors['passwordStrength'] === 'object';
  }

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

  public updateErrorMessage(errors: Record<string, string>): void {
    const errorMessages = [
      errors['lowerCase'],
      errors['upperCase'],
      errors['number'],
      errors['specialCharacter'],
      errors['minLength'],
    ];

    const firstErrorMessage = errorMessages.find(Boolean);
    this.errorMessage.set(firstErrorMessage || '');
  }
}
