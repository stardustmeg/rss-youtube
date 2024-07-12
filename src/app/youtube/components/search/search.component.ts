import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { SearchPipe } from '../../pipes/search/search.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';

@Component({
  imports: [FormsModule, CustomButtonComponent, MatIconModule, SearchPipe],
  providers: [SearchPipe],
  selector: 'app-search',
  standalone: true,
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
