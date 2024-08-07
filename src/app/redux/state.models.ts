import { Id } from '../youtube/models/id.model';
import { VideoItem } from '../youtube/models/video-item.model';

export interface AppState {
  customCards: VideoItem[];
  favoriteVideos: Id[];
  videos: VideoItem[];
}
