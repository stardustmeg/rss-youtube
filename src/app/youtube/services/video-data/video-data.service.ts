import { LoginService } from '@/app/auth/services/login/login.service';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';

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

  public constructor() {
    this.loginService.isLoggedIn().subscribe((isLoggedIn) => {
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

  public getVideoById(id: string): Observable<VideoItem> {
    return this.youtubeApiService.getVideoById(id);
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

  public setUpdatedData(data: VideoItem[]): void {
    this.updatedVideoItems.next(data);
  }

  public setVideoData(data: VideoItem[]): void {
    this.setFoundData(data);
    this.setUpdatedData(data);
  }
}
