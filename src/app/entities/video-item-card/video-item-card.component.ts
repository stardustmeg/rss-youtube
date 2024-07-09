import { VideoStatisticsComponent } from '@/app/feature/video-statistics/video-statistics.component';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { BorderColorDirective } from '@/app/shared/directives/border-color/border-color.directive';
import { Component, Input } from '@angular/core';

@Component({
  imports: [VideoStatisticsComponent, CustomButtonComponent, BorderColorDirective],
  providers: [BorderColorDirective],
  selector: 'app-video-item-card',
  standalone: true,
  styleUrl: './video-item-card.component.scss',
  templateUrl: './video-item-card.component.html',
})
export class VideoItemCardComponent {
  @Input() public Comments!: string;

  @Input() public Dislikes!: string;

  @Input() public Likes!: string;

  @Input() public Title!: string;

  @Input() public Views!: string;

  @Input() public image!: string;

  @Input() public publicationDate!: string;
}
