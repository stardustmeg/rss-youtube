import { NavigationService } from '@/app/core/services/navigation/navigation.service';
import { selectFavoriteVideosIds } from '@/app/redux/selectors/selectors';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { CustomLinkComponent } from '@/app/shared/components/custom-link/custom-link.component';
import { AsyncPipe, DatePipe, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { DeleteButtonComponent } from '../../components/delete-button/delete-button.component';
import { FavoriteButtonComponent } from '../../components/favorite-button/favorite-button.component';
import { VideoStatisticsComponent } from '../../components/video-statistics/video-statistics.component';
import { LOAD_TIMEOUT } from '../../constants/loadTimeout';
import { ChangeColorDirective } from '../../directives/change-color/change-color.directive';
import { VideoDataService } from '../../services/video-data/video-data.service';

const NOT_FOUND_VIDEO_IMAGE = '../../../../../assets/img/video-not-found.jpg';

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
  private subscription = new Subscription();

  private navigationService = inject(NavigationService);
  private store = inject(Store);
  public location = inject(Location);
  public videoService = inject(VideoDataService);

  public readonly placeholderImageUrl = NOT_FOUND_VIDEO_IMAGE;

  public imageFailedToLoad = signal(false);
  public imageLoaded = signal(false);
  public isFavorite = signal(false);

  constructor() {}

  public ngOnDestroy(): void {
    this.videoService.detailedInfo.set(undefined);
    this.subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.videoService.getVideoById();
    this.subscription.add(
      this.store.select(selectFavoriteVideosIds).subscribe((videos) => {
        this.isFavorite.set(videos.includes(this.navigationService.queryParams()['id']));
      }),
    );
    setTimeout(() => {
      if (!this.imageLoaded()) {
        this.imageFailedToLoad.set(true);
      }
    }, LOAD_TIMEOUT);
  }
}
