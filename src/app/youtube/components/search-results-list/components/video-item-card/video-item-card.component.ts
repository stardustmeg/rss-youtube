import { selectFavoriteVideos } from '@/app/redux/selectors/selectors';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { appRoute } from '@/app/shared/constants/routes';
import { ChangeColorDirective } from '@/app/youtube/directives/change-color/change-color.directive';
import { VideoItem } from '@/app/youtube/models/video-item.model';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { DeleteButtonComponent } from '../../../delete-button/delete-button.component';
import { FavoriteButtonComponent } from '../../../favorite-button/favorite-button.component';
import { VideoStatisticsComponent } from '../../../video-statistics/video-statistics.component';

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
export class VideoItemCardComponent implements OnInit {
  private router = inject(Router);

  private store = inject(Store);

  public imageLoaded = signal(false);

  public isFavorite = false;

  @Input() public video!: VideoItem;

  constructor() {}

  public moreButtonHandler(): void {
    this.router.navigate([appRoute.DETAILED], {
      queryParams: { id: this.video.id },
    });
  }

  public ngOnInit(): void {
    this.store.select(selectFavoriteVideos).subscribe((videos) => {
      this.isFavorite = videos.includes(this.video.id);
    });
  }
}
