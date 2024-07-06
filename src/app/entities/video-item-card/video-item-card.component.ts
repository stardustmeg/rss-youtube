import { VideoStatisticsComponent } from '@/app/feature/video-statistics/video-statistics.component';
import { Component } from '@angular/core';

@Component({
  imports: [VideoStatisticsComponent],
  selector: 'app-video-item-card',
  standalone: true,
  styleUrl: './video-item-card.component.scss',
  templateUrl: './video-item-card.component.html',
})
export class VideoItemCardComponent {}
