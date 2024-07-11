import { LocalStorageService } from '@/app/core/services/local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FakeAuthTokenService } from '../auth-token/fake-auth-token.service';
import { isValidLocalStorageData } from './helpers/helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly fakeTokenKey = 'fakeToken';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkInitialLoginStatus());

  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private fakeAuthTokenService: FakeAuthTokenService,
    private localStorageService: LocalStorageService,
  ) {}

  private checkInitialLoginStatus(): boolean {
    return this.localStorageService.getItem(this.fakeTokenKey) !== null;
  }

  getUserName(): null | string {
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

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  login(name: string): void {
    const fakeToken = this.fakeAuthTokenService.generateToken();
    this.localStorageService.setItem(this.fakeTokenKey, JSON.stringify({ name, token: fakeToken }));
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    this.localStorageService.removeItem(this.fakeTokenKey);
    this.isLoggedInSubject.next(false);
  }
}
