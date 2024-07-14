import { Component, inject } from '@angular/core';

import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';

@Component({
  providers: [FilterPipe],
  selector: 'app-filter',
  styleUrl: './filter.component.scss',
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  public inputValue = '';

  public constructor(
    private filterPipe: FilterPipe = inject(FilterPipe),
    private videoService: VideoDataService = inject(VideoDataService),
  ) {}

  public onChange(): void {
    const videoItems = this.videoService.getFoundData();
    const newItems = this.filterPipe.transform(videoItems, this.inputValue);
    this.videoService.setUpdatedData(newItems);
  }
}
