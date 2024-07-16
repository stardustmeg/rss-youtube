/* eslint-disable no-console */
import { stringTemplate } from '@/app/shared/utils/string-template';
import { Injectable } from '@angular/core';

import { LoggerService } from '../../logger.service';
import { loggerMessage } from '../constants/logger-message';

@Injectable({
  providedIn: 'root',
})
export class ProdLoggerService extends LoggerService {
  public override logMessage(message: string): void {
    console.log(stringTemplate(loggerMessage.PRODUCTION, { message }));
  }
}
