import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Response } from '../../models/response.model';
import { VideoItem } from '../../models/video-item.model';
import { YoutubeApiService } from '../youtube-api/youtube-api.service';

@Injectable({
  providedIn: 'root',
})
export class VideoDataService {
  private foundVideoItems: VideoItem[] = [];

  private updatedVideoItems = new BehaviorSubject<VideoItem[]>([]);

  private youtubeApiService: YoutubeApiService = inject(YoutubeApiService);

  public updatedVideoItems$ = this.updatedVideoItems.asObservable();

  public constructor() {}

  public getFoundData(): VideoItem[] {
    return this.foundVideoItems;
  }

  public getVideoById(id: string): VideoItem | null {
    return this.foundVideoItems.find((item) => item.id === id) || null;
  }

  public searchVideos(query: string): Observable<Response> {
    return this.youtubeApiService.searchVideos(query);
  }

  public setFoundData(data: VideoItem[]): void {
    this.foundVideoItems = data;
  }

  public setUpdatedData(data: VideoItem[]): void {
    this.updatedVideoItems.next(data);
  }
}
