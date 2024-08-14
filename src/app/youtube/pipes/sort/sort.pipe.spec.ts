import { SortPipe } from './sort.pipe';
import { sortingCriterion, sortingDirection } from '../../constants/sort-option';
import { VideoItem } from '../../models/video-item.model';

describe('SortPipe', () => {
  let pipe: SortPipe;
  let videos: VideoItem[];

  beforeEach(() => {
    pipe = new SortPipe();

    videos = [
      {
        snippet: { publishedAt: '2023-01-01T00:00:00Z' },
        statistics: { viewCount: '100' },
      },
      {
        snippet: { publishedAt: '2022-01-01T00:00:00Z' },
        statistics: { viewCount: '200' },
      },
      {
        snippet: { publishedAt: '2021-01-01T00:00:00Z' },
        statistics: { viewCount: '300' },
      },
    ] as VideoItem[];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null if videos is null', () => {
    expect(pipe.transform(null, { criterion: sortingCriterion.DATE, direction: sortingDirection.ASC })).toBeNull();
  });

  it('should return null if videos is an empty array', () => {
    expect(pipe.transform([], { criterion: sortingCriterion.DATE, direction: sortingDirection.ASC })).toBeNull();
  });

  it('should sort videos by date ascending', () => {
    const result = pipe.transform(videos, { criterion: sortingCriterion.DATE, direction: sortingDirection.ASC });
    expect(result).toEqual([
      { snippet: { publishedAt: '2021-01-01T00:00:00Z' }, statistics: { viewCount: '300' } },
      { snippet: { publishedAt: '2022-01-01T00:00:00Z' }, statistics: { viewCount: '200' } },
      { snippet: { publishedAt: '2023-01-01T00:00:00Z' }, statistics: { viewCount: '100' } },
    ]);
  });

  it('should sort videos by date descending', () => {
    const result = pipe.transform(videos, { criterion: sortingCriterion.DATE, direction: sortingDirection.DESC });
    expect(result).toEqual([
      { snippet: { publishedAt: '2023-01-01T00:00:00Z' }, statistics: { viewCount: '100' } },
      { snippet: { publishedAt: '2022-01-01T00:00:00Z' }, statistics: { viewCount: '200' } },
      { snippet: { publishedAt: '2021-01-01T00:00:00Z' }, statistics: { viewCount: '300' } },
    ]);
  });

  it('should sort videos by view count ascending', () => {
    const result = pipe.transform(videos, { criterion: sortingCriterion.VIEW_COUNT, direction: sortingDirection.ASC });
    expect(result).toEqual([
      { snippet: { publishedAt: '2023-01-01T00:00:00Z' }, statistics: { viewCount: '100' } },
      { snippet: { publishedAt: '2022-01-01T00:00:00Z' }, statistics: { viewCount: '200' } },
      { snippet: { publishedAt: '2021-01-01T00:00:00Z' }, statistics: { viewCount: '300' } },
    ]);
  });

  it('should sort videos by view count descending', () => {
    const result = pipe.transform(videos, { criterion: sortingCriterion.VIEW_COUNT, direction: sortingDirection.DESC });
    expect(result).toEqual([
      { snippet: { publishedAt: '2021-01-01T00:00:00Z' }, statistics: { viewCount: '300' } },
      { snippet: { publishedAt: '2022-01-01T00:00:00Z' }, statistics: { viewCount: '200' } },
      { snippet: { publishedAt: '2023-01-01T00:00:00Z' }, statistics: { viewCount: '100' } },
    ]);
  });
});
