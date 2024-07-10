import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

@Component({
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
  hidePassword = true;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required.bind(this)],
      password: ['', Validators.required.bind(this)],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginForm.reset();
      this.hidePassword = true; // TBD: check later if needed
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
