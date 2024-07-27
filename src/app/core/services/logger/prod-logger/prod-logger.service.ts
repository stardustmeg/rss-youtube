/* eslint-disable no-console */
import { stringTemplate } from '@/app/shared/utils/string-template';
import { Injectable } from '@angular/core';

import { loggerMessage } from '../constants/logger-message';
import { LoggerService } from '../logger.service';

@Injectable({
  providedIn: 'root',
})
export class ProdLoggerService extends LoggerService {
  public override logMessage(message: string): void {
    console.log(stringTemplate(loggerMessage.PRODUCTION, { message }));
  }
}
