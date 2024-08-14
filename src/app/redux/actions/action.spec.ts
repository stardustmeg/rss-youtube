import { VideoItem } from '@/app/youtube/models/video-item.model';
import * as actions from './actions';

const sampleVideoItem: VideoItem = {
  id: 'sample-id',
  kind: 'sample-kind',
  snippet: {
    description: 'sample-description',
    title: 'sample-title',
    publishedAt: 'sample-publishedAt',
    thumbnails: {
      default: {
        url: 'sample-url',
      },
      high: {
        url: 'sample-url',
      },
    },
    tags: ['sample-tag'],
  },
  statistics: {
    commentCount: 'sample-commentCount',
    dislikeCount: 'sample-dislikeCount',
    likeCount: 'sample-likeCount',
    viewCount: 'sample-viewCount',
  },
};

describe('NgRx Store Actions', () => {
  it('should create addCustomCard action', () => {
    const action = actions.addCustomCard({ card: sampleVideoItem });
    expect(action.type).toBe('[Admin] addCustomCard');
    expect(action.card).toEqual(sampleVideoItem);
  });

  it('should create deleteCustomCard action', () => {
    const action = actions.deleteCustomCard({ id: 'sample-id' });
    expect(action.type).toBe('[Admin] deleteCustomCard');
    expect(action.id).toBe('sample-id');
  });

  it('should create addYoutubeVideos action', () => {
    const videos: VideoItem[] = [sampleVideoItem];
    const action = actions.addYoutubeVideos({ videos });
    expect(action.type).toBe('[API] addYoutubeVideos');
    expect(action.videos).toEqual(videos);
  });

  it('should create addVideoToFavoriteIds action', () => {
    const action = actions.addVideoToFavoriteIds({ id: 'sample-id' });
    expect(action.type).toBe('[Favorite] addVideoToFavoriteIds');
    expect(action.id).toBe('sample-id');
  });

  it('should create deleteVideoFromFavoriteIds action', () => {
    const action = actions.deleteVideoFromFavoriteIds({ id: 'sample-id' });
    expect(action.type).toBe('[Favorite] deleteVideoFromFavoriteIds');
    expect(action.id).toBe('sample-id');
  });

  it('should create addVideoToFavorite action', () => {
    const action = actions.addVideoToFavorite({ id: 'sample-id', video: sampleVideoItem });
    expect(action.type).toBe('[Favorite] addVideoToFavorite');
    expect(action.id).toBe('sample-id');
    expect(action.video).toEqual(sampleVideoItem);
  });

  it('should create deleteVideoFromFavorite action', () => {
    const action = actions.deleteVideoFromFavorite({ id: 'sample-id' });
    expect(action.type).toBe('[Favorite] deleteVideoFromFavorite');
    expect(action.id).toBe('sample-id');
  });

  it('should create searchVideos action', () => {
    const action = actions.searchVideos({ maxResults: 10, pageToken: 'token', query: 'test' });
    expect(action.type).toBe('[Main Search] Search Videos');
    expect(action.maxResults).toBe(10);
    expect(action.pageToken).toBe('token');
    expect(action.query).toBe('test');
  });

  it('should create setNextPage action', () => {
    const action = actions.setNextPage({ nextPage: 'next-page-token' });
    expect(action.type).toBe('[Main Search] Set Next Page');
    expect(action.nextPage).toBe('next-page-token');
  });

  it('should create setPreviousPage action', () => {
    const action = actions.setPreviousPage({ previousPage: 'previous-page-token' });
    expect(action.type).toBe('[Main Search] Set Previous Page');
    expect(action.previousPage).toBe('previous-page-token');
  });
});
