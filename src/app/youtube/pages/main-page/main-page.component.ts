import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SearchResultsListComponent } from '../../components/search-results-list/search-results-list.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SearchResultsListComponent],
  selector: 'app-main-page',
  standalone: true,
  styleUrl: './main-page.component.scss',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {}
