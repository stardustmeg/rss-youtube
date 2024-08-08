import { VideoItem } from '@/app/youtube/models/video-item.model';
import { createReducer, on } from '@ngrx/store';

import { customCard, customCardThree, customCardTwo } from '../../../assets/db/test-db/kittens';
import * as Actions from '../actions/actions';
import { AppState } from '../state.models';

const initialState: AppState = {
  customCards: [customCard, customCardTwo, customCardThree],
  favoriteVideos: {},
  favoriteVideosIds: [],
  nextPage: '',
  previousPage: '',
  videos: {},
};

export const appReducer = createReducer(
  initialState,
  on(Actions.addYoutubeVideos, (state, { videos }) => {
    const newVideos = videos.reduce<{ [key: string]: VideoItem }>((acc, video) => {
      acc[video.id] = video;
      return acc;
    }, {});
    return {
      ...state,
      videos: { ...newVideos },
    };
  }),
  on(Actions.addCustomCard, (state, { card }) => ({
    ...state,
    customCards: [...state.customCards, card],
  })),
  on(Actions.deleteCustomCard, (state, { id }) => ({
    ...state,
    customCards: state.customCards.filter((card) => card.id !== id),
  })),
  on(Actions.addVideoToFavoriteIds, (state, { id }) => ({
    ...state,
    favoriteVideosIds: [...state.favoriteVideosIds, id],
  })),
  on(Actions.deleteVideoFromFavoriteIds, (state, { id }) => ({
    ...state,
    favoriteVideosIds: state.favoriteVideosIds.filter((videoId) => videoId !== id),
  })),
  on(Actions.addVideoToFavorite, (state, { id, video }) => ({
    ...state,
    favoriteVideos: { ...state.favoriteVideos, [id]: video },
  })),
  on(Actions.deleteVideoFromFavorite, (state, { id }) => {
    const newFavoriteVideos = { ...state.favoriteVideos };
    delete newFavoriteVideos[id];
    return {
      ...state,
      favoriteVideos: newFavoriteVideos,
    };
  }),
  on(Actions.setNextPage, (state, { nextPage }) => ({
    ...state,
    nextPage,
  })),
  on(Actions.setPreviousPage, (state, { previousPage }) => ({
    ...state,
    previousPage,
  })),
);
