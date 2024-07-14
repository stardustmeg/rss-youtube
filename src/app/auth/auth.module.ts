import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserComponent } from './components/user/user.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FakeAuthTokenService } from './services/auth-token/fake-auth-token.service';
import { LoginService } from './services/login/login.service';

const routes: Routes = [{ component: LoginPageComponent, path: '', pathMatch: 'full' }];

@NgModule({
  declarations: [LoginFormComponent, UserComponent, LoginPageComponent],
  exports: [LoginFormComponent, UserComponent, LoginPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MatFormField,
    MatLabel,
    MatIcon,
    RouterModule.forChild(routes),
  ],
  providers: [LoginService, FakeAuthTokenService, FormBuilder, Router, RouterLink],
})
export class AuthModule {}
