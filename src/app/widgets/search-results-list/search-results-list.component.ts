import { VideoItemCardComponent } from '@/app/entities/video-item-card/video-item-card.component';
import { Component } from '@angular/core';

@Component({
  imports: [VideoItemCardComponent],
  selector: 'app-search-results-list',
  standalone: true,
  styleUrl: './search-results-list.component.scss',
  templateUrl: './search-results-list.component.html',
})
export class SearchResultsListComponent {}
