import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Response } from '../../models/response.model';
import { VideoItem } from '../../models/video-item.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  private http = inject(HttpClient);

  private readonly searchEndpoint = 'search';

  private readonly videosEndpoint = 'videos';

  public constructor() {}

  public getVideoDetails(videoIds: string[]): Observable<VideoItem[]> {
    const params = new HttpParams().set('part', 'snippet,statistics').set('id', videoIds.join(','));
    return this.http.get<Response>(this.videosEndpoint, { params }).pipe(map((response) => response.items));
  }

  public searchVideos(query: string, maxResults: number): Observable<Response> {
    const params = new HttpParams().set('part', 'snippet').set('q', query).set('maxResults', maxResults.toString());
    return this.http.get<Response>(this.searchEndpoint, { params });
  }
}
