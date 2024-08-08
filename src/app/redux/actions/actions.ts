import { VideoItem } from '@/app/youtube/models/video-item.model';
import { createAction, props } from '@ngrx/store';

export const addCustomCard = createAction('[Admin] addCustomCard', props<{ card: VideoItem }>());

export const deleteCustomCard = createAction('[Admin] deleteCustomCard', props<{ id: string }>());

export const addYoutubeVideos = createAction('[API] addYoutubeVideos', props<{ videos: VideoItem[] }>());

export const addVideoToFavoriteIds = createAction('[Favorite] addVideoToFavoriteIds', props<{ id: string }>());

export const deleteVideoFromFavoriteIds = createAction(
  '[Favorite] deleteVideoFromFavoriteIds',
  props<{ id: string }>(),
);

export const addVideoToFavorite = createAction(
  '[Favorite] addVideoToFavorite',
  props<{ id: string; video: VideoItem }>(),
);

export const deleteVideoFromFavorite = createAction('[Favorite] deleteVideoFromFavorite', props<{ id: string }>());

export const searchVideos = createAction(
  '[Main Search] Search Videos',
  props<{ maxResults?: number; pageToken?: string; query: string }>(),
);

export const setNextPage = createAction('[Main Search] Set Next Page', props<{ nextPage: string }>());

export const setPreviousPage = createAction('[Main Search] Set Previous Page', props<{ previousPage: string }>());
