import { environment } from '@/environments/environment';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './core/header/header.component';
import { DevLoggerService } from './core/services/logger/dev-logger/dev-logger.service';
import { LoggerService } from './core/services/logger/logger.service';
import { ProdLoggerService } from './core/services/logger/prod-logger/prod-logger.service';
import { MainPageComponent } from './youtube/pages/main-page/main-page.component';

@Component({
  imports: [HeaderComponent, RouterOutlet, MainPageComponent],
  providers: [{ provide: LoggerService, useClass: environment.production ? ProdLoggerService : DevLoggerService }],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {}
