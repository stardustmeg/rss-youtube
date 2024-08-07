import { VideoItem } from '../youtube/models/video-item.model';

export interface AppState {
  customCards: VideoItem[];
  favoriteVideos: Record<string, VideoItem>;
  favoriteVideosIds: string[];
  videos: VideoItem[];
}
