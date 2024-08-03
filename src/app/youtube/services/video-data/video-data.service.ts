import { LoginService } from '@/app/auth/services/login/login.service';
import { addYoutubeVideos } from '@/app/redux/actions/actions';
import { selectCustomCards, selectVideos } from '@/app/redux/selectors/selectors';
import { Injectable, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, switchMap } from 'rxjs';

import { SortOptionType } from '../../components/sort/helper/isSortCriterion.helper';
import { BASIC_SORT_OPTION } from '../../constants/sort-option';
import { VideoItem } from '../../models/video-item.model';
import { YoutubeApiService } from '../youtube-api/youtube-api.service';

@Injectable({
  providedIn: 'root',
})
export class VideoDataService {
  private customCards$ = inject(Store).select(selectCustomCards);

  private foundVideos$ = inject(Store).select(selectVideos);

  private joinedVideoItems$ = combineLatest([this.foundVideos$, this.customCards$]).pipe(
    map(([foundVideos, customCards]) => customCards.concat(foundVideos)),
  );

  private loginService = inject(LoginService);

  private store = inject(Store);

  private youtubeApiService: YoutubeApiService = inject(YoutubeApiService);

  public filterQuery = signal<string>('');

  public joinedVideoItems = signal<VideoItem[]>([]);

  public sortCriteria = signal<SortOptionType>(BASIC_SORT_OPTION);

  constructor() {
    if (!this.loginService.isLoggedIn()) {
      this.store.dispatch(addYoutubeVideos({ videos: [] }));
    }
    this.joinedVideoItems$.subscribe((videoItems) => {
      this.joinedVideoItems.set(videoItems);
    });
  }

  private setFoundData(data: VideoItem[]): void {
    this.store.dispatch(addYoutubeVideos({ videos: data }));
  }

  public fetchVideoDetails(videoIds: string[]): Observable<VideoItem[]> {
    return this.youtubeApiService.getVideoDetails(videoIds);
  }

  public getVideoById(id: string): Observable<VideoItem> {
    return this.youtubeApiService.getVideoDetails([id]).pipe(map((detailedVideos) => detailedVideos[0]));
  }

  public searchVideos(query: string, maxResults = 20): Observable<VideoItem[]> {
    return this.youtubeApiService.searchVideos(query, maxResults).pipe(
      map((searchResponse) => searchResponse.items.map((item) => item.id.videoId)),
      switchMap((videoIds: string[]) => this.fetchVideoDetails(videoIds)),
      map((detailedVideos) => {
        this.setFoundData(detailedVideos);
        return detailedVideos;
      }),
    );
  }
}
