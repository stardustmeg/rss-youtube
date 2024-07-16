import { LocalStorageService } from '@/app/core/services/local-storage/local-storage.service';
import { userMessage } from '@/app/shared/components/snack-bar/constants/user-message';
import { SnackBarComponent } from '@/app/shared/components/snack-bar/snack-bar.component';
import { stringTemplate } from '@/app/shared/utils/string-template';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { FakeAuthTokenService } from '../auth-token/fake-auth-token.service';
import { LOGIN_KEY } from './constants/login-key';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private fakeAuthTokenService = inject(FakeAuthTokenService);

  private readonly localStorageKey = LOGIN_KEY;

  private localStorageService = inject(LocalStorageService);

  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(this.checkIsLoggedIn());

  private snackBar = new SnackBarComponent();

  public constructor() {}

  public checkIsLoggedIn(): boolean {
    return this.localStorageService.getItem(this.localStorageKey) !== null;
  }

  public getUserName(): null | string {
    return this.localStorageService.getUserName(this.localStorageKey) || null;
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn$;
  }

  public login(name: string): void {
    const fakeToken = this.fakeAuthTokenService.generateToken();
    this.localStorageService.setItem(this.localStorageKey, JSON.stringify({ name, token: fakeToken }));
    this.loggedIn$.next(true);
    this.snackBar.openSnackBar(stringTemplate(userMessage.SUCCESSFUL_LOGIN, { name }));
  }

  public logout(): void {
    this.localStorageService.removeItem(this.localStorageKey);
    this.loggedIn$.next(false);
    this.snackBar.openSnackBar(userMessage.LOGOUT);
  }
}
