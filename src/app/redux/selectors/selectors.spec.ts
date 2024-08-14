import { VideoItem } from '@/app/youtube/models/video-item.model';
import {
  selectAppState,
  selectVideos,
  selectCustomCards,
  selectFavoriteVideosIds,
  selectFavoriteVideos,
  selectFavoriteVideosFromAllVideos,
  selectNextPage,
  selectPreviousPage,
} from './selectors';
import { AppState } from '../state.models';

const videos: VideoItem[] = [
  {
    id: '1',
    kind: 'youtube#video',
    snippet: {
      description: 'test',
      publishedAt: 'test',
      tags: ['test'],
      thumbnails: {
        default: { url: 'test' },
        high: { url: 'test' },
      },
      title: 'test',
    },
    statistics: {
      commentCount: 'test',
      dislikeCount: 'test',
      likeCount: 'test',
      viewCount: 'test',
    },
  },
];

describe('Selectors', () => {
  const initialState: AppState = {
    videos: { '1': videos[0], '2': { ...videos[0], id: '2' } },
    customCards: [videos[0]],
    favoriteVideosIds: ['1', '3'],
    favoriteVideos: { '1': videos[0] },
    nextPage: 'page2',
    previousPage: 'page1',
  };

  it('should select the app state', () => {
    const result = selectAppState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select videos', () => {
    const result = selectVideos.projector(initialState);
    expect(result).toEqual(initialState.videos);
  });

  it('should select custom cards', () => {
    const result = selectCustomCards.projector(initialState);
    expect(result).toEqual(initialState.customCards);
  });

  it('should select favorite videos ids', () => {
    const result = selectFavoriteVideosIds.projector(initialState);
    expect(result).toEqual(initialState.favoriteVideosIds);
  });

  it('should select favorite videos', () => {
    const result = selectFavoriteVideos.projector(initialState);
    expect(result).toEqual(initialState.favoriteVideos);
  });

  it('should select favorite videos from all videos', () => {
    const result = selectFavoriteVideosFromAllVideos.projector(initialState.videos, initialState.favoriteVideosIds);
    expect(result).toEqual([videos[0]]);
  });

  it('should select the next page', () => {
    const result = selectNextPage.projector(initialState);
    expect(result).toEqual(initialState.nextPage);
  });

  it('should select the previous page', () => {
    const result = selectPreviousPage.projector(initialState);
    expect(result).toEqual(initialState.previousPage);
  });
});
