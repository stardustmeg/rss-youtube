import { environment } from '@/environments/environment';
import { Component } from '@angular/core';

import { LoggerService } from './core/services/logger.service';
import { DevLoggerService } from './core/services/logger/dev-logger/dev-logger.service';
import { ProdLoggerService } from './core/services/logger/prod-logger/prod-logger.service';

@Component({
  providers: [{ provide: LoggerService, useClass: environment.production ? ProdLoggerService : DevLoggerService }],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export default class AppComponent {}
