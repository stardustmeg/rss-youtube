import { createReducer, on } from '@ngrx/store';

import * as Actions from '../actions/actions';
import { AppState } from '../state.models';

const initialState: AppState = {
  customCards: [],
  videos: [],
};

export const appReducer = createReducer(
  initialState,
  on(Actions.addYoutubeVideos, (state, { videos }) => ({
    ...state,
    videos,
  })),
  on(Actions.addCustomCard, (state, { card }) => ({
    ...state,
    customCards: [...state.customCards, card],
  })),
  on(Actions.deleteCustomCard, (state, { id }) => ({
    ...state,
    customCards: state.customCards.filter((card) => card.id.videoId !== id),
  })),
);
