import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class LoggerService {
  public abstract logMessage(message: string): void;
}
