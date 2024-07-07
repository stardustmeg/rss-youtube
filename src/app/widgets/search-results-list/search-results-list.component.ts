import VideoItem from '@/app/core/models/video-item.model';
import { VideoItemCardComponent } from '@/app/entities/video-item-card/video-item-card.component';
import { SortPipe } from '@/app/shared/pipes/sort/sort.pipe';
import { VideoServiceService } from '@/app/shared/services/video-service/video-service.service';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [CommonModule, VideoItemCardComponent, NgFor, SortPipe],
  selector: 'app-search-results-list',
  standalone: true,
  styleUrl: './search-results-list.component.scss',
  templateUrl: './search-results-list.component.html',
})
export class SearchResultsListComponent implements OnInit {
  videos: VideoItem[] = [];

  constructor(private videoService: VideoServiceService) {}

  ngOnInit(): void {
    this.videoService.videoItems$.subscribe((items) => {
      this.videos = items;
    });
  }
}
