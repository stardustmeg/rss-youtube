import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FakeAuthTokenService {
  public constructor() {}

  public generateToken(): string {
    return crypto.randomUUID();
  }
}
