import { userMessage } from '@/app/shared/services/snackBar/constants/user-message';
import { SnackBarService } from '@/app/shared/services/snackBar/snack-bar.service';
import { VideoDataService } from '@/app/youtube/services/video-data/video-data.service';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { addYoutubeVideos, searchVideos } from '../actions/actions';

@Injectable()
export class VideoEffects {
  private actions$ = inject(Actions);
  private snackBarService = inject(SnackBarService);
  private videoDataService = inject(VideoDataService);

  public searchVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchVideos),
      mergeMap((action) =>
        this.videoDataService.searchVideos(action.query, action.maxResults, action.pageToken).pipe(
          map((videos) => addYoutubeVideos({ videos })),
          catchError(() => {
            this.snackBarService.openSnackBar(userMessage.VIDEO_SEARCH_FAILED);
            return EMPTY;
          }),
        ),
      ),
    ),
  );
}
