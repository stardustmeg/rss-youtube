import { Id } from './id.model';
import Snippet from './snippet.model';
import Statistics from './statistics.model';

export interface VideoItem {
  id: Id;
  kind: string;
  snippet: Snippet;
  statistics: Statistics;
}
