import * as data from '@/assets/db/response.json';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { VideoItem } from '../../models/video-item.model';

@Injectable({
  providedIn: 'root',
})
export class VideoDataService {
  private foundVideoItems: VideoItem[] = [];

  private originalVideoItems: VideoItem[] = data.items;

  private updatedVideoItems = new BehaviorSubject<VideoItem[]>([]);

  public updatedVideoItems$ = this.updatedVideoItems.asObservable();

  private constructor() {}

  public getFoundData(): VideoItem[] {
    return this.foundVideoItems;
  }

  public getOriginalData(): VideoItem[] {
    return this.originalVideoItems;
  }

  public getVideoById(id: string): VideoItem | null {
    return this.originalVideoItems.find((item) => item.id === id) || null;
  } // TBD: remove with fetch by ID

  public setFoundData(data: VideoItem[]): void {
    this.foundVideoItems = data;
  }

  public setUpdatedData(data: VideoItem[]): void {
    this.updatedVideoItems.next(data);
  }
}
