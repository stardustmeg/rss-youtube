import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { appRoute } from '@/app/shared/constants/routes';
import { ChangeColorDirective } from '@/app/youtube/directives/change-color/change-color.directive';
import { VideoItem } from '@/app/youtube/models/video-item.model';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { VideoStatisticsComponent } from '../../../video-statistics/video-statistics.component';

@Component({
  imports: [VideoStatisticsComponent, CustomButtonComponent, ChangeColorDirective],
  providers: [ChangeColorDirective],
  selector: 'app-video-item-card',
  standalone: true,
  styleUrl: './video-item-card.component.scss',
  templateUrl: './video-item-card.component.html',
})
export class VideoItemCardComponent {
  @Input() video!: VideoItem;

  constructor(private router: Router) {}

  async moreButtonHandler(): Promise<void> {
    await this.router.navigate([appRoute.DETAILED], { queryParams: { id: this.video.id } });
  }
}
