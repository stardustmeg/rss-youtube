import Thumbnails from './thumbnails.model';

interface Snippet {
  description: string;
  publishedAt: string;
  tags: string[];
  thumbnails: Thumbnails;
  title: string;
}

export default Snippet;
