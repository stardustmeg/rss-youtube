import { VideoItem } from '../youtube/models/video-item.model';

export interface AppState {
  customCards: VideoItem[];
  favoriteVideos: string[];
  videos: VideoItem[];
}
