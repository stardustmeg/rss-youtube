import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { BorderColorDirective } from '@/app/youtube/directives/border-color/border-color.directive';
import { Component, Input } from '@angular/core';

import { VideoStatisticsComponent } from '../../../video-statistics/video-statistics.component';

@Component({
  imports: [VideoStatisticsComponent, CustomButtonComponent, BorderColorDirective],
  providers: [BorderColorDirective],
  selector: 'app-video-item-card',
  standalone: true,
  styleUrl: './video-item-card.component.scss',
  templateUrl: './video-item-card.component.html',
})
export class VideoItemCardComponent {
  @Input() Comments!: string;

  @Input() Dislikes!: string;

  @Input() Likes!: string;

  @Input() Title!: string;

  @Input() Views!: string;

  @Input() image!: string;

  @Input() publicationDate!: string;
}
