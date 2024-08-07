import { selectFavoriteVideos } from '@/app/redux/selectors/selectors';
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
  private favoriteVideosIds$ = inject(Store).select(selectFavoriteVideos);

  private subscription = new Subscription();

  public videos: VideoItem[] = [];

  public constructor() {}

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.favoriteVideosIds$.subscribe((videos) => {
        this.videos = Object.values(videos);
      }),
    );
  }
}
