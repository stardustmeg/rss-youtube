import { Component, Input } from '@angular/core';

import { VideoItem } from '../../models/video-item.model';

@Component({
  selector: 'app-video-statistics',
  styleUrl: './video-statistics.component.scss',
  templateUrl: './video-statistics.component.html',
})
export class VideoStatisticsComponent {
  @Input() public video!: VideoItem;
}
