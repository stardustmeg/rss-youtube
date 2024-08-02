import { VideoItem } from '@/app/youtube/models/video-item.model';
import { createAction, props } from '@ngrx/store';

export const addCustomCard = createAction('[Admin] addCustomCard', props<{ card: VideoItem }>());

export const deleteCustomCard = createAction('[Admin] deleteCustomCard', props<{ id: string }>());

export const addYoutubeVideos = createAction('[API] addYoutubeVideos', props<{ videos: VideoItem[] }>());
