import { Pipe, PipeTransform } from '@angular/core';

import VideoItem from '../../models/video-item.model';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  public transform(videos: VideoItem[], searchTerm: string): VideoItem[] {
    if (!videos || !searchTerm) {
      return videos;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return videos.filter((video) => video.snippet.title.toLowerCase().includes(lowerCaseSearchTerm));
  }
}
