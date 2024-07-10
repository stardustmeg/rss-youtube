import Snippet from './snippet.model';
import Statistics from './statistics.model';

export interface VideoItem {
  etag: string;
  id: string;
  kind: string;
  snippet: Snippet;
  statistics: Statistics;
}
