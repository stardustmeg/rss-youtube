import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FakeAuthTokenService {
  private constructor() {}

  public generateToken(): string {
    return crypto.randomUUID();
  }
}
