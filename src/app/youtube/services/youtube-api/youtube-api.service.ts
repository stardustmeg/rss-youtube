import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Response } from '../../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  private readonly endpoint = 'search';

  public constructor(private http: HttpClient) {}

  public searchVideos(query: string): Observable<Response> {
    const params = new HttpParams().set('part', 'snippet').set('q', query);

    return this.http.get<Response>(this.endpoint, { params });
  }
}
