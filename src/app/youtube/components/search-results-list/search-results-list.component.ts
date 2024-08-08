import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { SortPipe } from '../../pipes/sort/sort.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';
import { VideoItemCardComponent } from './components/video-item-card/video-item-card.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, VideoItemCardComponent, AsyncPipe, FilterPipe, SortPipe, PaginationComponent],
  providers: [FilterPipe, SortPipe],
  selector: 'app-search-results-list',
  standalone: true,
  styleUrl: './search-results-list.component.scss',
  templateUrl: './search-results-list.component.html',
})
export class SearchResultsListComponent {
  public videoService = inject(VideoDataService);
}
