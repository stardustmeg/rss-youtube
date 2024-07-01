import Snippet from './snippet.model';
import Statistics from './statistics.model';

interface VideoItem {
  etag: string;
  id: string;
  kind: string;
  publishedAt: string;
  snippet: Snippet;
  statistics: Statistics;
  title: string;
}

export default VideoItem;
