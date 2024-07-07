import VideoItem from '@/app/core/models/video-item.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(value: VideoItem[], criteria: string, direction: string): VideoItem[] {
    if (!Array.isArray(value)) {
      return value;
    }

    return value.sort((a, b) => {
      let comparison = 0;

      if (criteria === 'date') {
        const dateA = new Date(a.snippet.publishedAt).getTime();
        const dateB = new Date(b.snippet.publishedAt).getTime();
        comparison = dateA - dateB;
      } else if (criteria === 'viewCount') {
        const viewCountA = parseInt(a.statistics.viewCount, 10);
        const viewCountB = parseInt(b.statistics.viewCount, 10);
        comparison = viewCountA - viewCountB;
      }

      return direction === 'desc' ? -comparison : comparison;
    });
  }
}
