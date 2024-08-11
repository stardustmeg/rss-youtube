import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { SearchResponse, VideosResponse } from '../../models/response.model';
import { VideoItem } from '../../models/video-item.model';
import { endponts } from './constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  private http = inject(HttpClient);

  private readonly searchEndpoint = endponts.SEARCH;
  private readonly videosEndpoint = endponts.VIDEOS;

  constructor() {}

  public getVideoDetails(videoIds: string[]): Observable<VideoItem[]> {
    const params = new HttpParams().set('part', 'snippet,statistics').set('id', videoIds.join(','));
    return this.http.get<VideosResponse>(this.videosEndpoint, { params }).pipe(map((response) => response.items));
  }

  public searchVideos(query: string, maxResults: number, pageToken = ''): Observable<SearchResponse> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('q', query)
      .set('maxResults', maxResults.toString())
      .set('pageToken', pageToken);
    return this.http.get<SearchResponse>(this.searchEndpoint, { params });
  }
}
