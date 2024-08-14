import { VideoItem } from '../../models/video-item.model';
import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
  });

  let pipe: SearchPipe;
  let videos: VideoItem[];

  beforeEach(() => {
    pipe = new SearchPipe();

    videos = [
      { snippet: { title: 'Angular Tutorial', description: 'Learn Angular step by step' } },
      { snippet: { title: 'React Tutorial', description: 'Learn React step by step' } },
      { snippet: { title: 'Vue Tutorial', description: 'Learn Vue step by step' } },
    ] as VideoItem[];
  });

  it('should return the original array if videos is null or undefined', () => {
    expect(pipe.transform([], 'angular')).toEqual([]);
  });

  it('should return the original array if searchTerm is empty', () => {
    expect(pipe.transform(videos, '')).toEqual(videos);
  });

  it('should filter videos by title', () => {
    const result = pipe.transform(videos, 'Angular');
    expect(result).toEqual([{ snippet: { title: 'Angular Tutorial', description: 'Learn Angular step by step' } }]);
  });

  it('should be case insensitive', () => {
    const result = pipe.transform(videos, 'vUe');
    expect(result).toEqual([{ snippet: { title: 'Vue Tutorial', description: 'Learn Vue step by step' } }]);
  });

  it('should return an empty array if no videos match', () => {
    const result = pipe.transform(videos, 'Non-existent');
    expect(result).toEqual([]);
  });
});
