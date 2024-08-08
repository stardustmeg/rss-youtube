import { VideoItem } from '../youtube/models/video-item.model';

export interface AppState {
  customCards: VideoItem[];
  favoriteVideos: Record<string, VideoItem>;
  favoriteVideosIds: string[];
  nextPage: string;
  previousPage: string;
  videos: Record<string, VideoItem>;
}
