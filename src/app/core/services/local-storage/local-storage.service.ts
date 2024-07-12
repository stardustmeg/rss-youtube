import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private constructor() {}

  public clear(): void {
    localStorage.clear();
  }

  public getItem(key: string): null | string {
    return localStorage.getItem(key);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
