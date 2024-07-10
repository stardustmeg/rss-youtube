import * as data from '@/assets/db/response.json';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { VideoItem } from '../../models/video-item.model';

@Injectable({
  providedIn: 'root',
})
export class VideoDataService {
  foundVideoItems: VideoItem[] = [];

  originalVideoItems: VideoItem[] = data.items;

  updatedVideoItems = new BehaviorSubject<VideoItem[]>([]);

  updatedVideoItems$ = this.updatedVideoItems.asObservable();

  constructor() {}

  getFoundData(): VideoItem[] {
    return this.foundVideoItems;
  }

  getOriginalData(): VideoItem[] {
    return this.originalVideoItems;
  }

  getUpdatedData(): VideoItem[] {
    return this.updatedVideoItems.getValue();
  }

  getVideoById(id: string): VideoItem {
    return this.originalVideoItems.find((item) => item.id === id) || this.foundVideoItems[0];
  } // TBD: remove eith fetch by ID

  setFoundData(data: VideoItem[]): void {
    this.foundVideoItems = data;
  }

  setUpdatedData(data: VideoItem[]): void {
    this.updatedVideoItems.next(data);
  }
}
