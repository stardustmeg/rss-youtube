import { NavigationService } from '@/app/core/services/navigation/navigation.service';
import { selectFavoriteVideos } from '@/app/redux/selectors/selectors';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { CustomLinkComponent } from '@/app/shared/components/custom-link/custom-link.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { DeleteButtonComponent } from '../../components/delete-button/delete-button.component';
import { FavoriteButtonComponent } from '../../components/favorite-button/favorite-button.component';
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
    CustomButtonComponent,
    DeleteButtonComponent,
    FavoriteButtonComponent,
  ],
  providers: [ChangeColorDirective, DatePipe],
  selector: 'app-detailed-info-page',
  standalone: true,
  styleUrl: './detailed-info-page.component.scss',
  templateUrl: './detailed-info-page.component.html',
})
export class DetailedInfoPageComponent implements OnDestroy, OnInit {
  private navigationService = inject(NavigationService);

  private store = inject(Store);

  private subscription: Subscription | undefined;

  public imageLoaded = signal(false);

  public isFavorite = signal(false);

  public videoService = inject(VideoDataService);

  constructor() {
    this.videoService.getVideoById();
  }

  public ngOnDestroy(): void {
    this.videoService.detailedInfo.set(undefined);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public ngOnInit(): void {
    this.videoService.getVideoById();
    this.subscription = this.store.select(selectFavoriteVideos).subscribe((videos) => {
      this.isFavorite.set(videos.includes(this.navigationService.queryParams()['id']));
    });
  }
}
