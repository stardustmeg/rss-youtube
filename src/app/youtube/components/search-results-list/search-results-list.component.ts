import { Component, OnInit } from '@angular/core';

import { VideoItem } from '../../models/video-item.model';
import { VideoDataService } from '../../services/video-data/video-data.service';

@Component({
  selector: 'app-search-results-list',
  styleUrl: './search-results-list.component.scss',
  templateUrl: './search-results-list.component.html',
})
export class SearchResultsListComponent implements OnInit {
  public videos: VideoItem[] = [];

  public constructor(private videoService: VideoDataService) {}

  public ngOnInit(): void {
    this.videoService.updatedVideoItems$.subscribe((items) => {
      this.videos = items;
    });
  }
}
