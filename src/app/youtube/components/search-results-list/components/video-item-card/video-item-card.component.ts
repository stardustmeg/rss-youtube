import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { appRoute } from '@/app/shared/constants/routes';
import { ChangeColorDirective } from '@/app/youtube/directives/change-color/change-color.directive';
import { VideoItem } from '@/app/youtube/models/video-item.model';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

import { VideoStatisticsComponent } from '../../../video-statistics/video-statistics.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VideoStatisticsComponent, CustomButtonComponent, ChangeColorDirective],
  providers: [ChangeColorDirective],
  selector: 'app-video-item-card',
  standalone: true,
  styleUrl: './video-item-card.component.scss',
  templateUrl: './video-item-card.component.html',
})
export class VideoItemCardComponent {
  private router = inject(Router);

  @Input() public video!: VideoItem;

  public constructor() {}

  public moreButtonHandler(): void {
    this.router.navigate([appRoute.DETAILED], { queryParams: { id: this.video.id } });
  }
}
