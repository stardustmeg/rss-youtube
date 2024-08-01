import { Pipe, PipeTransform } from '@angular/core';

import { sortingCriterion, sortingDirection } from '../../constants/sort-option';
import { VideoItem } from '../../models/video-item.model';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  private static compareDates(a: Date, b: Date): number {
    return a.getTime() - b.getTime();
  }

  private static compareNumbers(a: number, b: number): number {
    return a - b;
  }

  public transform(videos: VideoItem[], params: { criterion: string; direction: string }): VideoItem[] {
    if (!Array.isArray(videos) || videos.length === 0) {
      return videos;
    }

    const compareFn = (a: VideoItem, b: VideoItem): number => {
      const comparison =
        params.criterion === sortingCriterion.DATE
          ? SortPipe.compareDates(new Date(a.snippet.publishedAt), new Date(b.snippet.publishedAt))
          : SortPipe.compareNumbers(parseInt(a.statistics.viewCount, 10), parseInt(b.statistics.viewCount, 10));

      return params.direction === sortingDirection.DESC ? -comparison : comparison;
    };

    return videos.sort(compareFn);
  }
}
