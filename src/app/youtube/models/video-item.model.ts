import { Id } from './id.model';
import Snippet from './snippet.model';
import Statistics from './statistics.model';

interface GeneralItem {
  kind: string;
  snippet: Snippet;
  statistics: Statistics;
}

export interface VideoItem extends GeneralItem {
  id: string;
}

export interface SearchVideoItem extends GeneralItem {
  id: Id;
}
