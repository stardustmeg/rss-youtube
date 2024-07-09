import PageInfo from './page-info.model';
import VideoItem from './video-item.model';

export interface Response {
  etag: string;
  items: VideoItem[];
  kind: string;
  pageInfo: PageInfo;
}
