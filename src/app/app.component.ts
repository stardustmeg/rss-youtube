import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './core/header/header.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SearchResulsPageComponent } from './pages/search-resuls-page/search-resuls-page.component';

@Component({
  imports: [HeaderComponent, RouterOutlet, MainPageComponent, SearchResulsPageComponent],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export default class AppComponent {
  title = 'youtube';
}
