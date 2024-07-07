import VideoItem from '@/app/core/models/video-item.model';
import * as data from '@/assets/db/response.json';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoServiceService {
  originalVideoItems: VideoItem[] = data.items;

  updatedVideoItems = new BehaviorSubject<VideoItem[]>([]);

  updatedVideoItems$ = this.updatedVideoItems.asObservable();

  constructor() {}

  getOriginalData(): VideoItem[] {
    return this.originalVideoItems;
  }

  getUpdatedData(): VideoItem[] {
    return this.updatedVideoItems.getValue();
  }

  setUpdatedData(data: VideoItem[]): void {
    this.updatedVideoItems.next(data);
  }
}
