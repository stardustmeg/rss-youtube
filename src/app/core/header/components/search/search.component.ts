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
  currentValue = '';

  searchPipe = inject(SearchPipe);

  videoService = inject(VideoServiceService);

  constructor() {}

  onSubmit(): void {
    const videoItems = this.videoService.getVideos();
    const newItems = this.searchPipe.transform(videoItems, this.currentValue);
    this.videoService.setVideos(newItems);
  }
}
