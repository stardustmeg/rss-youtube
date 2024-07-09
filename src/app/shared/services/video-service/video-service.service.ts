import VideoItem from '@/app/core/models/video-item.model';
import * as data from '@/assets/db/response.json';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoServiceService {
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

  public getUpdatedData(): VideoItem[] {
    return this.updatedVideoItems.getValue();
  }

  public setFoundData(data: VideoItem[]): void {
    this.foundVideoItems = data;
  }

  public setUpdatedData(data: VideoItem[]): void {
    this.updatedVideoItems.next(data);
  }
}
