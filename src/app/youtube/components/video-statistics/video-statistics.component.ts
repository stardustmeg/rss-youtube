import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { VideoItem } from '../../models/video-item.model';

@Component({
  imports: [MatIcon],
  selector: 'app-video-statistics',
  standalone: true,
  styleUrl: './video-statistics.component.scss',
  templateUrl: './video-statistics.component.html',
})
export class VideoStatisticsComponent {
  @Input() video!: VideoItem;
}
