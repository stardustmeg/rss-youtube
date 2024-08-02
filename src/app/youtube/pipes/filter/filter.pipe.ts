import { Pipe, PipeTransform } from '@angular/core';

import { VideoItem } from '../../models/video-item.model';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  public transform(videos: VideoItem[] | null, searchTerm: string): VideoItem[] | null {
    if (!videos) {
      return null;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return videos.filter(
      (video) =>
        video.snippet.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        video.snippet.description.toLowerCase().includes(lowerCaseSearchTerm),
    );
  }
}
