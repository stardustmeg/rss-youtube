import { VideoItem } from '@/app/youtube/models/video-item.model';
import { appReducer } from './reducers';
import * as Actions from '../actions/actions';
import { AppState } from '../state.models';

const initialState: AppState = {
  customCards: [],
  favoriteVideos: {},
  favoriteVideosIds: [],
  nextPage: '',
  previousPage: '',
  videos: {},
};

const newVideos: VideoItem[] = [
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

describe('App Reducer', () => {
  const action = Actions.addYoutubeVideos({ videos: newVideos });
  const state = appReducer(initialState, action);

  expect(state.videos).toEqual({ '1': newVideos[0] });
});

it('should add a custom card', () => {
  const newCard = {
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
  };
  const action = Actions.addCustomCard({ card: newCard });
  const state = appReducer(initialState, action);

  expect(state.customCards).toContain(newCard);
});

it('should delete a custom card', () => {
  const action = Actions.deleteCustomCard({ id: '2' });
  const state = appReducer(initialState, action);

  expect(state.customCards).not.toContainEqual({ id: '2', name: 'Card 2' });
});

it('should add a video to favorite IDs', () => {
  const action = Actions.addVideoToFavoriteIds({ id: '1' });
  const state = appReducer(initialState, action);

  expect(state.favoriteVideosIds).toContain('1');
});

it('should delete a video from favorite IDs', () => {
  const modifiedState = { ...initialState, favoriteVideosIds: ['1', '2'] };
  const action = Actions.deleteVideoFromFavoriteIds({ id: '1' });
  const state = appReducer(modifiedState, action);

  expect(state.favoriteVideosIds).not.toContain('1');
});

it('should add a video to favorites', () => {
  const action = Actions.addVideoToFavorite({ id: '1', video: newVideos[0] });
  const state = appReducer(initialState, action);

  expect(state.favoriteVideos['1']).toEqual(newVideos[0]);
});

it('should delete a video from favorites', () => {
  const modifiedState = { ...initialState, favoriteVideos: { '1': { id: '1', kind: 'youtube#video' } as VideoItem } };
  const action = Actions.deleteVideoFromFavorite({ id: '1' });
  const state = appReducer(modifiedState, action);

  expect(state.favoriteVideos['1']).toBeUndefined();
});

it('should set the next page', () => {
  const action = Actions.setNextPage({ nextPage: 'page2' });
  const state = appReducer(initialState, action);

  expect(state.nextPage).toEqual('page2');
});

it('should set the previous page', () => {
  const action = Actions.setPreviousPage({ previousPage: 'page1' });
  const state = appReducer(initialState, action);

  expect(state.previousPage).toEqual('page1');
});
