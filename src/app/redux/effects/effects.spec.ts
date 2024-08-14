import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestScheduler } from 'rxjs/testing';
import { Observable } from 'rxjs';
import { VideoDataService } from '@/app/youtube/services/video-data/video-data.service';
import { SnackBarService } from '@/app/shared/services/snackBar/snack-bar.service';
import { Action } from '@ngrx/store';
import { VideoItem } from '@/app/youtube/models/video-item.model';
import { VideoEffects } from './effects';
import { searchVideos, addYoutubeVideos } from '../actions/actions';

describe('VideoEffects', () => {
  let actions$: Observable<Action>;
  let effects: VideoEffects;
  let videoDataService: jest.Mocked<VideoDataService>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    const videoDataServiceMock: Partial<VideoDataService> = {
      searchVideos: jest.fn(),
      getVideoById: jest.fn(),
      fetchVideoDetails: jest.fn(),
    };

    const snackBarServiceMock: Partial<SnackBarService> = {
      openSnackBar: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        VideoEffects,
        provideMockActions(() => actions$),
        { provide: VideoDataService, useValue: videoDataServiceMock },
        { provide: SnackBarService, useValue: snackBarServiceMock },
      ],
    });

    effects = TestBed.inject(VideoEffects);
    videoDataService = TestBed.inject(VideoDataService) as jest.Mocked<VideoDataService>;
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should return addYoutubeVideos action on successful video search', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action = searchVideos({ query: 'test', maxResults: 5, pageToken: '' });
      const videos: VideoItem[] = [
        {
          id: '1',
          kind: 'youtube#video',
          snippet: {
            description: 'test',
            publishedAt: 'test',
            tags: ['test'],
            thumbnails: {
              default: {
                url: 'test',
              },
              high: {
                url: 'test',
              },
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
      const outcome = addYoutubeVideos({ videos });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: videos });
      videoDataService.searchVideos.mockReturnValue(response);

      expectObservable(effects.searchVideos$).toBe('--b', { b: outcome });
    });
  });
});
