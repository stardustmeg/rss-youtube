import PageInfo from './page-info.model';
import { SearchVideoItem, VideoItem } from './video-item.model';

interface Response {
  etag: string;
  kind: string;
  pageInfo: PageInfo;
}

export interface VideosResponse extends Response {
  items: VideoItem[];
}

export interface SearchResponse extends Response {
  items: SearchVideoItem[];
  nextPageToken?: string;
  prevPageToken?: string;
}
