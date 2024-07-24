import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { VideoItem } from '../../models/video-item.model';
import { SortPipe } from '../../pipes/sort/sort.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';
import { VideoItemCardComponent } from './components/video-item-card/video-item-card.component';

@Component({
  imports: [CommonModule, VideoItemCardComponent, SortPipe],
  selector: 'app-search-results-list',
  standalone: true,
  styleUrl: './search-results-list.component.scss',
  templateUrl: './search-results-list.component.html',
})
export class SearchResultsListComponent implements OnInit {
  private videoService = inject(VideoDataService);

  public videos: VideoItem[] | null = null;

  public constructor() {}

  public ngOnInit(): void {
    this.videoService.updatedVideoItems$.subscribe((items) => {
      this.videos = items;
    });
  }
}
