import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FakeAuthTokenService {
  constructor() {}

  generateToken(): string {
    return crypto.randomUUID();
  }
}
