import { Injectable } from '@angular/core';
import { randomUUID } from 'crypto';

@Injectable({
  providedIn: 'root',
})
export class FakeAuthTokenService {
  constructor() {}

  generateToken(): string {
    return randomUUID();
  }
}
