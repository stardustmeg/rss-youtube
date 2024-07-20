import { LoginService } from '@/app/auth/services/login/login.service';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, switchMap, takeUntil } from 'rxjs';

import { VideoItem } from '../../models/video-item.model';
import { YoutubeApiService } from '../youtube-api/youtube-api.service';
import { videoKind } from './constants/videoKind';

@Injectable({
  providedIn: 'root',
})
export class VideoDataService implements OnDestroy {
  private destroy$ = new Subject<void>();

  private foundVideoItems: VideoItem[] = [];

  private loginService = inject(LoginService);

  private updatedVideoItems = new BehaviorSubject<VideoItem[]>([]);

  private youtubeApiService: YoutubeApiService = inject(YoutubeApiService);

  public updatedVideoItems$ = this.updatedVideoItems.asObservable();

  public constructor() {
    this.loginService
      .isLoggedIn()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoggedIn) => {
        if (!isLoggedIn) {
          this.clearVideoItems();
        }
      });
  }

  private clearVideoItems(): void {
    this.setVideoData([]);
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

  public getVideoById(id: string): Observable<VideoItem | null> {
    return this.youtubeApiService.getVideoById(id) || null;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public searchVideos(query: string, maxResults = 20): Observable<VideoItem[]> {
    return this.youtubeApiService.searchVideos(query, maxResults).pipe(
      map((searchResponse) =>
        searchResponse.items
          .filter((item) => item.kind === videoKind.SEARCH_RESULT && item.id.videoId)
          .map((item) => item.id.videoId),
      ),
      switchMap((videoIds: string[]) => (videoIds.length ? this.fetchVideoDetails(videoIds) : [])),
      map((detailedVideos) => {
        this.setVideoData(detailedVideos);
        return detailedVideos;
      }),
    );
  }

  public setUpdatedData(data: VideoItem[]): void {
    this.updatedVideoItems.next(data);
  }

  public setVideoData(data: VideoItem[]): void {
    this.setFoundData(data);
    this.setUpdatedData(data);
  }
}
