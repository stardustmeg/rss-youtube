import { VideoItem } from '@/app/youtube/models/video-item.model';

export const createNewCard = (props: {
  id: string;
  date: Date;
  description: string | undefined | null;
  imageLink: string | undefined | null;
  title: string | undefined | null;
  videoLink: string | undefined | null;
  tags: string[] | undefined | null;
}): VideoItem => {
  const newCard: VideoItem = {
    id: props.id,
    kind: 'custom#card',
    snippet: {
      description: props.description ?? '',
      publishedAt: props.date.toISOString(),
      tags: props.tags ?? [],
      thumbnails: {
        default: { url: props.videoLink ?? '' },
        high: { url: props.imageLink ?? '' },
      },
      title: props.title ?? '',
    },
    statistics: {
      commentCount: '0',
      dislikeCount: '0',
      likeCount: '0',
      viewCount: '0',
    },
  };

  return newCard;
};
