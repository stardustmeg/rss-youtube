import VideoItem from '@/app/core/models/video-item.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  public transform(videos: VideoItem[], searchTerm: string): VideoItem[] {
    if (!videos || !searchTerm) {
      return videos;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return videos.filter(
      (video) =>
        video.snippet.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        video.snippet.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        video.snippet.tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearchTerm)),
    );
  }
}
