import { LocalStorageService } from '@/app/core/services/local-storage/local-storage.service';
import { userMessage } from '@/app/shared/services/snackBar/constants/user-message';
import { SnackBarService } from '@/app/shared/services/snackBar/snack-bar.service';
import { stringTemplate } from '@/app/shared/utils/string-template';
import { Injectable, inject, signal } from '@angular/core';

import { FakeAuthTokenService } from '../auth-token/fake-auth-token.service';
import { LOGIN_KEY } from './constants/login-key';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly localStorageKey = LOGIN_KEY;

  private fakeAuthTokenService = inject(FakeAuthTokenService);
  private localStorageService = inject(LocalStorageService);
  private snackBar = inject(SnackBarService);

  public isLoggedIn = signal(this.checkIsLoggedIn());

  constructor() {}

  private checkIsLoggedIn(): boolean {
    return this.localStorageService.getItem(this.localStorageKey) !== null;
  }

  public getUserName(): null | string {
    return this.localStorageService.getUserName(this.localStorageKey) ?? null;
  }

  public login(name: string): void {
    const fakeToken = this.fakeAuthTokenService.generateToken();
    this.localStorageService.setItem(this.localStorageKey, JSON.stringify({ name, token: fakeToken }));
    this.isLoggedIn.set(true);
    this.snackBar.openSnackBar(stringTemplate(userMessage.SUCCESSFUL_LOGIN, { name }));
  }

  public logout(): void {
    this.localStorageService.removeItem(this.localStorageKey);
    this.isLoggedIn.set(false);
    this.snackBar.openSnackBar(userMessage.LOGOUT);
  }
}
