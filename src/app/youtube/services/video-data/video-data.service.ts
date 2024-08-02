import { LoginService } from '@/app/auth/services/login/login.service';
import { addYoutubeVideos } from '@/app/redux/actions/actions';
import { selectCustomCards, selectVideos } from '@/app/redux/selectors/selectors';
import { Injectable, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest, map, switchMap } from 'rxjs';

import { VideoItem } from '../../models/video-item.model';
import { YoutubeApiService } from '../youtube-api/youtube-api.service';

@Injectable({
  providedIn: 'root',
})
export class VideoDataService {
  private customCards$ = inject(Store).select(selectCustomCards);

  private foundVideoItems$ = inject(Store).select(selectVideos);

  private joinedVideoItems$ = combineLatest([this.foundVideoItems$, this.customCards$]).pipe(
    map(([foundVideoItems, customCards]) => customCards.concat(foundVideoItems)),
  );

  private loginService = inject(LoginService);

  private store = inject(Store);

  private updatedVideoItems = new BehaviorSubject<VideoItem[] | null>(null);

  private youtubeApiService: YoutubeApiService = inject(YoutubeApiService);

  public joinedVideoItems = signal<VideoItem[]>([]);

  public updatedVideoItems$ = this.updatedVideoItems.asObservable();

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

  public getFoundData(): VideoItem[] {
    let foundVideoItems: VideoItem[] = [];
    this.foundVideoItems$.subscribe((videos) => {
      foundVideoItems = videos;
    });
    return foundVideoItems;
  }

  public getVideoById(id: string): Observable<VideoItem> {
    return this.youtubeApiService.getVideoDetails([id]).pipe(map((detailedVideos) => detailedVideos[0]));
  }

  public searchVideos(query: string, maxResults = 20): Observable<VideoItem[]> {
    return this.youtubeApiService.searchVideos(query, maxResults).pipe(
      map((searchResponse) => searchResponse.items.map((item) => item.id.videoId)),
      switchMap((videoIds: string[]) => this.fetchVideoDetails(videoIds)),
      map((detailedVideos) => {
        this.setUpdatedData(detailedVideos);
        this.setFoundData(detailedVideos);
        return detailedVideos;
      }),
    );
  }

  public setUpdatedData(data: VideoItem[] | null): void {
    this.updatedVideoItems.next(data);
  }

  public setVideoData(data: VideoItem[] | null): void {
    if (!data) {
      this.setFoundData([]);
      this.setUpdatedData(data);
    } else {
      this.setFoundData(data);
      this.setUpdatedData(data);
    }
  }
}
