import { Id } from './id.model';
import Snippet from './snippet.model';
import Statistics from './statistics.model';

export interface VideoItem {
  etag: string;
  id: Id;
  kind: string;
  snippet: Snippet;
  statistics: Statistics;
}
