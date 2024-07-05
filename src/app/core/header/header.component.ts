import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { SortComponent } from './components/sort/sort.component';
import { UserComponent } from './components/user/user.component';

@Component({
  imports: [MatButtonModule, MatIconModule, RouterLink, FilterComponent, SearchComponent, SortComponent, UserComponent],
  selector: 'app-header',
  standalone: true,
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
