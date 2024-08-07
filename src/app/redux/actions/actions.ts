import { Id } from '@/app/youtube/models/id.model';
import { VideoItem } from '@/app/youtube/models/video-item.model';
import { createAction, props } from '@ngrx/store';

export const addCustomCard = createAction('[Admin] addCustomCard', props<{ card: VideoItem }>());

export const deleteCustomCard = createAction('[Admin] deleteCustomCard', props<{ id: string }>());

export const addYoutubeVideos = createAction('[API] addYoutubeVideos', props<{ videos: VideoItem[] }>());

export const addVideoToFavorite = createAction('[Favorite] addVideoToFavorite', props<{ id: Id }>());

export const deleteVideoFromFavorite = createAction('[Favorite] deleteVideoFromFavorite', props<{ id: Id }>());
