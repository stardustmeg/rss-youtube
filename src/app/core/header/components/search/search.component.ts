import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { SearchPipe } from '@/app/shared/pipes/search/search.pipe';
import { VideoServiceService } from '@/app/shared/services/video-service/video-service.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [FormsModule, CustomButtonComponent, MatIconModule, SearchPipe],
  providers: [SearchPipe],
  selector: 'app-search',
  standalone: true,
  styleUrl: './search.component.scss',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  private searchPipe = inject(SearchPipe);

  private videoService = inject(VideoServiceService);

  public inputValue = '';

  public constructor() {}

  public onChange(): void {
    const videoItems = this.videoService.getOriginalData();
    const newItems = this.searchPipe.transform(videoItems, this.inputValue);
    this.videoService.setUpdatedData(newItems);
  }
}
