import { LoggerService } from '@/app/core/services/logger/logger.service';
import { userMessage } from '@/app/shared/components/snack-bar/constants/user-message';
import { SnackBarComponent } from '@/app/shared/components/snack-bar/snack-bar.component';
import { appRoute } from '@/app/shared/constants/routes';
import { stringTemplate } from '@/app/shared/utils/string-template';
import { passwordStrengthValidator } from '@/app/shared/validators/validators';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
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
    MatHint,
  ],
  selector: 'app-login-form',
  standalone: true,
  styleUrls: ['./login-form.component.scss'],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  private logger = inject(LoggerService);

  private router = inject(Router);

  private snackBar: SnackBarComponent = new SnackBarComponent();

  public hidePassword = true;

  public loginForm: FormGroup = new FormGroup({});

  public loginService = inject(LoginService);

  public constructor() {}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordStrengthValidator]],
    });
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

  public togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
