import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';
import { VideoItemCardComponent } from './components/video-item-card/video-item-card.component';

@Component({
  imports: [CommonModule, VideoItemCardComponent, AsyncPipe, FilterPipe],
  providers: [FilterPipe],
  selector: 'app-search-results-list',
  standalone: true,
  styleUrl: './search-results-list.component.scss',
  templateUrl: './search-results-list.component.html',
})
export class SearchResultsListComponent {
  public videoService = inject(VideoDataService);

  public videos$ = inject(VideoDataService).updatedVideoItems$;
}
