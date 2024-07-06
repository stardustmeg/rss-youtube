import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [MatIcon],
  selector: 'app-video-statistics',
  standalone: true,
  styleUrl: './video-statistics.component.scss',
  templateUrl: './video-statistics.component.html',
})
export class VideoStatisticsComponent {
  @Input() Comments = 0;

  @Input() Dislikes = 0;

  @Input() Likes = 0;

  @Input() Views = 0;
}
