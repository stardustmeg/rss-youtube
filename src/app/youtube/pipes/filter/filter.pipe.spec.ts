import { FilterPipe } from './filter.pipe';
import { VideoItem } from '../../models/video-item.model';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  let pipe: FilterPipe;
  let videos: VideoItem[];

  beforeEach(() => {
    pipe = new FilterPipe();

    videos = [
      { snippet: { title: 'Angular Tutorial', description: 'Learn Angular step by step' } },
      { snippet: { title: 'React Tutorial', description: 'Learn React step by step' } },
      { snippet: { title: 'Vue Tutorial', description: 'Learn Vue step by step' } },
    ] as VideoItem[];
  });

  it('should return null if videos is null', () => {
    expect(pipe.transform(null, 'angular')).toBeNull();
  });

  it('should filter videos by title', () => {
    const result = pipe.transform(videos, 'Angular');
    expect(result).toEqual([{ snippet: { title: 'Angular Tutorial', description: 'Learn Angular step by step' } }]);
  });

  it('should filter videos by description', () => {
    const result = pipe.transform(videos, 'Learn React');
    expect(result).toEqual([{ snippet: { title: 'React Tutorial', description: 'Learn React step by step' } }]);
  });

  it('should be case insensitive', () => {
    const result = pipe.transform(videos, 'vUe');
    expect(result).toEqual([{ snippet: { title: 'Vue Tutorial', description: 'Learn Vue step by step' } }]);
  });

  it('should return an empty array if no videos match', () => {
    const result = pipe.transform(videos, 'Non-existent');
    expect(result).toEqual([]);
  });

  it('should return all videos if searchTerm is empty', () => {
    const result = pipe.transform(videos, '');
    expect(result).toEqual(videos);
  });
});
