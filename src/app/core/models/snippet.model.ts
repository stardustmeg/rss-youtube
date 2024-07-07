import Localization from './localized.model';
import Thumbnails from './thumbnails.model';

interface Snippet {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  defaultAudioLanguage: string;
  description: string;
  liveBroadcastContent: string;
  localized: Localization;
  publishedAt: string;
  tags: string[];
  thumbnails: Thumbnails;
  title: string;
}

export default Snippet;
