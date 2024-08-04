import { CustomLinkComponent } from '@/app/shared/components/custom-link/custom-link.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, inject, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

import { VideoStatisticsComponent } from '../../components/video-statistics/video-statistics.component';
import { ChangeColorDirective } from '../../directives/change-color/change-color.directive';
import { VideoDataService } from '../../services/video-data/video-data.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CustomLinkComponent,
    VideoStatisticsComponent,
    ChangeColorDirective,
    RouterLink,
    DatePipe,
    AsyncPipe,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  providers: [ChangeColorDirective, DatePipe],
  selector: 'app-detailed-info-page',
  standalone: true,
  styleUrl: './detailed-info-page.component.scss',
  templateUrl: './detailed-info-page.component.html',
})
export class DetailedInfoPageComponent implements OnDestroy {
  public imageLoaded = signal(false);

  public videoService = inject(VideoDataService);

  constructor() {
    this.videoService.getVideoById();
  }

  public ngOnDestroy(): void {
    this.videoService.detailedInfo.set(undefined);
  }
}
