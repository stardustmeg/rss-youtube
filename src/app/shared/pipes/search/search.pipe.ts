import VideoItem from '@/app/core/models/video-item.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(videos: VideoItem[], searchTerm: string): VideoItem[] {
    if (!videos || !searchTerm) {
      return videos;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return videos.filter((video) => video.snippet.title.toLowerCase().includes(lowerCaseSearchTerm));
  }
}
