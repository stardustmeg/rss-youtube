import {
  // NOTE: this is how I want it
  selectFavoriteVideos,
  // NOTE: this is to follow the requirements of the project
  // selectFavoriteVideosFromAllVideos
} from '@/app/redux/selectors/selectors';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { VideoItemCardComponent } from '../../components/search-results-list/components/video-item-card/video-item-card.component';
import { VideoItem } from '../../models/video-item.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VideoItemCardComponent],
  selector: 'app-favorites-page',
  standalone: true,
  styleUrl: './favorites-page.component.scss',
  templateUrl: './favorites-page.component.html',
})
export class FavoritesPageComponent implements OnInit, OnDestroy {
  // NOTE: this is how I want it
  private favoriteVideos$ = inject(Store).select(selectFavoriteVideos);

  // NOTE: this is to follow the requirements of the project
  // private favoriteVideos$ = inject(Store).select(selectFavoriteVideosFromAllVideos);

  private subscription = new Subscription();

  public videos: VideoItem[] = [];

  public constructor() {}

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.favoriteVideos$.subscribe((videos) => {
        this.videos = Object.values(videos);
      }),
    );
  }
}
