import { LocalStorageService } from '@/app/core/services/local-storage/local-storage.service';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { FakeAuthTokenService } from '../auth-token/fake-auth-token.service';
import { LOGIN_KEY } from './constants/login-key';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private fakeAuthTokenService = inject(FakeAuthTokenService);

  private localStorageService = inject(LocalStorageService);

  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(this.checkIsLoggedIn());

  public constructor() {}

  public checkIsLoggedIn(): boolean {
    return this.localStorageService.getItem(LOGIN_KEY) !== null;
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn$;
  }

  public login(name: string): void {
    const fakeToken = this.fakeAuthTokenService.generateToken();
    this.localStorageService.setItem(LOGIN_KEY, JSON.stringify({ name, token: fakeToken }));
    this.loggedIn$.next(true);
  }

  public logout(): void {
    this.localStorageService.removeItem(LOGIN_KEY);
    this.loggedIn$.next(false);
  }
}
