import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { SearchPipe } from '@/app/shared/pipes/search/search.pipe';
import { VideoServiceService } from '@/app/shared/services/video-service/video-service.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatIcon, CustomButtonComponent, SearchPipe],
  providers: [SearchPipe],
  selector: 'app-filter',
  standalone: true,
  styleUrl: './filter.component.scss',
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  inputValue = '';

  searchPipe = inject(SearchPipe);

  videoService = inject(VideoServiceService);

  constructor() {}

  onSubmit(): void {
    const videoItems = this.videoService.getOriginalData();
    const newItems = this.searchPipe.transform(videoItems, this.inputValue);
    this.videoService.setUpdatedData(newItems);
  }
}
