import { Injectable } from '@angular/core';

import { isValidLocalStorageData } from './helpers/helper';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public getItem(key: string): null | string {
    return localStorage.getItem(key);
  }

  public getUserName(key: string): null | string {
    const storedData = this.getItem(key);
    if (!storedData) {
      return null;
    }
    const parsedData: unknown = JSON.parse(storedData);
    if (isValidLocalStorageData(parsedData)) {
      return parsedData.name;
    }
    return null;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
