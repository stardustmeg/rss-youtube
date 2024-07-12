import { LocalStorageService } from '@/app/core/services/local-storage/local-storage.service';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FakeAuthTokenService } from '../auth-token/fake-auth-token.service';
import { isValidLocalStorageData } from './helpers/helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private fakeAuthTokenService = inject(FakeAuthTokenService);

  private readonly fakeTokenKey = 'fakeToken';

  private localStorageService = inject(LocalStorageService);

  public isLoggedIn$ = of(this.checkIsLoggedIn());

  public constructor() {}

  private checkIsLoggedIn(): boolean {
    return this.localStorageService.getItem(this.fakeTokenKey) !== null;
  }

  public getIsLoggedIn(): boolean {
    return this.checkIsLoggedIn();
  }

  public getUserName(): null | string {
    const storedData = this.localStorageService.getItem(this.fakeTokenKey);
    if (!storedData) {
      return null;
    }
    const parsedData: unknown = JSON.parse(storedData);
    if (isValidLocalStorageData(parsedData)) {
      return parsedData.name;
    }
    return null;
  }

  public login(name: string): void {
    const fakeToken = this.fakeAuthTokenService.generateToken();
    this.localStorageService.setItem(this.fakeTokenKey, JSON.stringify({ name, token: fakeToken }));
    this.isLoggedIn$ = of(true);
  }

  public logout(): void {
    this.localStorageService.removeItem(this.fakeTokenKey);
    this.isLoggedIn$ = of(false);
  }

  public get isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
