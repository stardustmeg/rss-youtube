import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Response } from '../../models/response.model';
import { VideoItem } from '../../models/video-item.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  private readonly searchEndpoint = 'search';

  private readonly videosEndpoint = 'videos';

  public constructor(private http: HttpClient) {}

  public getVideoById(id: string): Observable<VideoItem> {
    const params = new HttpParams().set('part', 'snippet,contentDetails,statistics').set('id', id);
    return this.http.get<Response>(this.videosEndpoint, { params }).pipe(map((response) => response.items[0]));
  }

  public getVideoDetails(videoIds: string[]): Observable<VideoItem[]> {
    const params = new HttpParams().set('part', 'snippet,contentDetails,statistics').set('id', videoIds.join(','));
    return this.http.get<Response>(this.videosEndpoint, { params }).pipe(map((response) => response.items));
  }

  public searchVideos(query: string): Observable<Response> {
    const params = new HttpParams().set('part', 'snippet').set('q', query);
    return this.http.get<Response>(this.searchEndpoint, { params });
  }
}
