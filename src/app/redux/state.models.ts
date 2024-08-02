import { VideoItem } from '../youtube/models/video-item.model';

export interface AppState {
  customCards: VideoItem[];
  videos: VideoItem[];
}
