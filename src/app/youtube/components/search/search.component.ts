import { Component, inject } from '@angular/core';

import { SearchPipe } from '../../pipes/search/search.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';

@Component({
  providers: [SearchPipe],
  selector: 'app-search',
  styleUrl: './search.component.scss',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  public inputValue = '';

  public constructor(
    private searchPipe: SearchPipe = inject(SearchPipe),
    private videoService: VideoDataService = inject(VideoDataService),
  ) {}

  public onChange(): void {
    const videoItems = this.videoService.getOriginalData();
    const newItems = this.searchPipe.transform(videoItems, this.inputValue);
    this.videoService.setUpdatedData(newItems);
    this.videoService.setFoundData(newItems);
  }
}
