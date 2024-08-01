import { LoginService } from '@/app/auth/services/login/login.service';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';

import { VideoItem } from '../../models/video-item.model';
import { YoutubeApiService } from '../youtube-api/youtube-api.service';
import { videoKind } from './constants/videoKind';

@Injectable({
  providedIn: 'root',
})
export class VideoDataService {
  private foundVideoItems: VideoItem[] = [];

  private loginService = inject(LoginService);

  private updatedVideoItems = new BehaviorSubject<VideoItem[] | null>(null);

  private youtubeApiService: YoutubeApiService = inject(YoutubeApiService);

  public updatedVideoItems$ = this.updatedVideoItems.asObservable();

  constructor() {
    this.loginService
      .isLoggedIn()
      .pipe(
        tap((isLoggedIn) => {
          if (!isLoggedIn) {
            this.clearVideoItems();
          }
        }),
      )
      .subscribe();
  }

  private clearVideoItems(): void {
    this.setVideoData(null);
  }

  private setFoundData(data: VideoItem[]): void {
    this.foundVideoItems = data;
  }

  public fetchVideoDetails(videoIds: string[]): Observable<VideoItem[]> {
    return this.youtubeApiService.getVideoDetails(videoIds);
  }

  public getFoundData(): VideoItem[] {
    return this.foundVideoItems;
  }

  public getVideoById(id: string): Observable<VideoItem> {
    return this.youtubeApiService.getVideoDetails([id]).pipe(map((detailedVideos) => detailedVideos[0]));
  }

  public searchVideos(query: string, maxResults = 20): Observable<VideoItem[]> {
    return this.youtubeApiService.searchVideos(query, maxResults).pipe(
      map((searchResponse) =>
        searchResponse.items
          .filter((item) => item.kind === videoKind.SEARCH_RESULT && item.id.videoId)
          .map((item) => item.id.videoId),
      ),
      switchMap((videoIds: string[]) => this.fetchVideoDetails(videoIds)),
      map((detailedVideos) => {
        this.setVideoData(detailedVideos);
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
