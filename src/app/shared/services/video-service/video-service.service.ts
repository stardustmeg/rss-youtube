import VideoItem from '@/app/core/models/video-item.model';
import * as data from '@/assets/db/response.json';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoServiceService {
  videoItems = new BehaviorSubject<VideoItem[]>([]);

  videoItems$ = this.videoItems.asObservable();

  constructor() {}

  getVideos(): void {
    this.videoItems.next(data.items);
  }
}
