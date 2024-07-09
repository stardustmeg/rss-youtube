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
  @Input() public Comments = '';

  @Input() public Dislikes = '';

  @Input() public Likes = '';

  @Input() public Views = '';
}
