import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './core/header/header.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

@Component({
  imports: [HeaderComponent, RouterOutlet, MainPageComponent],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export default class AppComponent {
  public title = 'youtube';
}
