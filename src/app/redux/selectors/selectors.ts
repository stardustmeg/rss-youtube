import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../state.models';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectVideos = createSelector(selectAppState, (state: AppState) => state.videos);

export const selectCustomCards = createSelector(selectAppState, (state: AppState) => state.customCards);
