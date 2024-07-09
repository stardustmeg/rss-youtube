import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import VideoItem from '../../models/video-item.model';
import { SortPipe } from '../../pipes/sort/sort.pipe';
import { VideoServiceService } from '../../services/video-service/video-service.service';
import { VideoItemCardComponent } from './components/video-item-card/video-item-card.component';

@Component({
  imports: [CommonModule, VideoItemCardComponent, NgFor, SortPipe],
  selector: 'app-search-results-list',
  standalone: true,
  styleUrl: './search-results-list.component.scss',
  templateUrl: './search-results-list.component.html',
})
export class SearchResultsListComponent implements OnInit {
  public videos: VideoItem[] = [];

  public constructor(private videoService: VideoServiceService) {}

  public ngOnInit(): void {
    this.videoService.updatedVideoItems$.subscribe((items) => {
      this.videos = items;
    });
  }
}
