import VideoItem from '@/app/core/models/video-item.model';
import { VideoItemCardComponent } from '@/app/entities/video-item-card/video-item-card.component';
import { VideoServiceService } from '@/app/shared/services/video-service/video-service.service';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  imports: [CommonModule, VideoItemCardComponent, NgFor],
  selector: 'app-search-results-list',
  standalone: true,
  styleUrl: './search-results-list.component.scss',
  templateUrl: './search-results-list.component.html',
})
export class SearchResultsListComponent implements OnInit {
  videos$!: Observable<VideoItem[]>;

  constructor(private videoService: VideoServiceService) {}

  ngOnInit(): void {
    this.videos$ = this.videoService.getVideos();
  }
}
