import { createReducer, on } from '@ngrx/store';

import * as Actions from '../actions/actions';
import { AppState } from '../state.models';

// for testing; delete later

const customCard = {
  id: '11111111',
  kind: 'custom#card',
  snippet: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    publishedAt: '2024-07-25T00:00:00Z',
    tags: ['tag1', 'tag2'],
    thumbnails: {
      default: {
        url: 'https://images.ctfassets.net/sfnkq8lmu5d7/1NaIFGyBn0qwXYlNaCJSEl/ad59ce5eefa3c2322b696778185cc749/2021_0825_Kitten_Health.jpg',
      },
      high: {
        url: 'https://images.ctfassets.net/sfnkq8lmu5d7/1NaIFGyBn0qwXYlNaCJSEl/ad59ce5eefa3c2322b696778185cc749/2021_0825_Kitten_Health.jpg',
      },
    },
    title: 'kitten',
  },
  statistics: {
    commentCount: '0',
    dislikeCount: '0',
    likeCount: '0',
    viewCount: '0',
  },
};

const customCardTwo = {
  id: '22222',
  kind: 'custom#card',
  snippet: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    publishedAt: '2024-06-25T00:00:00Z',
    tags: ['tag1', 'tag2'],
    thumbnails: {
      default: {
        url: 'https://images.ctfassets.net/sfnkq8lmu5d7/1NaIFGyBn0qwXYlNaCJSEl/ad59ce5eefa3c2322b696778185cc749/2021_0825_Kitten_Health.jpg',
      },
      high: {
        url: 'https://images.ctfassets.net/sfnkq8lmu5d7/1NaIFGyBn0qwXYlNaCJSEl/ad59ce5eefa3c2322b696778185cc749/2021_0825_Kitten_Health.jpg',
      },
    },
    title: 'kitten too',
  },
  statistics: {
    commentCount: '0',
    dislikeCount: '0',
    likeCount: '0',
    viewCount: '0',
  },
};

const initialState: AppState = {
  customCards: [customCard, customCardTwo],
  favoriteVideos: [],
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
    customCards: state.customCards.filter((card) => card.id !== id),
  })),
  on(Actions.addVideoToFavorite, (state, { id }) => ({
    ...state,
    favoriteVideos: [...state.favoriteVideos, id],
  })),
  on(Actions.deleteVideoFromFavorite, (state, { id }) => ({
    ...state,
    favoriteVideos: state.favoriteVideos.filter((videoId) => videoId !== id),
  })),
);
