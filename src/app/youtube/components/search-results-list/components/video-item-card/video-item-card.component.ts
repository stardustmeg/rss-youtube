import { selectFavoriteVideosIds } from '@/app/redux/selectors/selectors';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { appRoute } from '@/app/shared/constants/routes';
import { LOAD_TIMEOUT } from '@/app/youtube/constants/loadTimeout';
import { ChangeColorDirective } from '@/app/youtube/directives/change-color/change-color.directive';
import { VideoItem } from '@/app/youtube/models/video-item.model';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { DeleteButtonComponent } from '../../../delete-button/delete-button.component';
import { FavoriteButtonComponent } from '../../../favorite-button/favorite-button.component';
import { VideoStatisticsComponent } from '../../../video-statistics/video-statistics.component';

const NOT_FOUND_VIDEO_IMAGE = '../../../../../../assets/img/video-not-found.jpg';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VideoStatisticsComponent,
    CustomButtonComponent,
    ChangeColorDirective,
    MatProgressSpinnerModule,
    DeleteButtonComponent,
    FavoriteButtonComponent,
  ],
  providers: [ChangeColorDirective],
  selector: 'app-video-item-card',
  standalone: true,
  styleUrl: './video-item-card.component.scss',
  templateUrl: './video-item-card.component.html',
})
export class VideoItemCardComponent implements OnInit, OnDestroy {
  private router = inject(Router);

  private store = inject(Store);

  private subscription = new Subscription();

  public imageFailedToLoad = signal(false);

  public imageLoaded = signal(false);

  public isFavorite = false;

  public readonly placeholderImageUrl = NOT_FOUND_VIDEO_IMAGE;

  @Input() public video!: VideoItem;

  constructor() {}

  public moreButtonHandler(): void {
    this.router.navigate([appRoute.DETAILED], {
      queryParams: { id: this.video.id },
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.store.select(selectFavoriteVideosIds).subscribe((videos) => {
        this.isFavorite = videos.includes(this.video.id);
      }),
    );
    setTimeout(() => {
      if (!this.imageLoaded()) {
        this.imageFailedToLoad.set(true);
      }
    }, LOAD_TIMEOUT);
  }
}
