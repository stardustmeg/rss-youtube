import VideoItem from '@/app/core/models/video-item.model';
import * as data from '@/assets/db/response.json';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoServiceService {
  constructor() {}

  getVideos(): Observable<VideoItem[]> {
    const videos = data.items;
    return of(videos);
  }
}
