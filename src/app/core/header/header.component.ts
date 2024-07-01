import { Component } from '@angular/core';

import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SortComponent } from './components/sort/sort.component';
import { UserComponent } from './components/user/user.component';

@Component({
  imports: [FilterComponent, SearchComponent, SettingsComponent, SortComponent, UserComponent],
  selector: 'app-header',
  standalone: true,
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
