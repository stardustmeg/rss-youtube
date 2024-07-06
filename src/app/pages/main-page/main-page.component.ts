import { SearchResultsListComponent } from '@/app/widgets/search-results-list/search-results-list.component';
import { Component } from '@angular/core';

@Component({
  imports: [SearchResultsListComponent],
  selector: 'app-main-page',
  standalone: true,
  styleUrl: './main-page.component.scss',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {}
