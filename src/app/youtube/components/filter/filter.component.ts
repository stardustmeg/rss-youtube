import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { VideoServiceService } from '../../services/video-service/video-service.service';

@Component({
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatIcon, CustomButtonComponent, FilterPipe],
  providers: [FilterPipe],
  selector: 'app-filter',
  standalone: true,
  styleUrl: './filter.component.scss',
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  private FilterPipe = inject(FilterPipe);

  private videoService = inject(VideoServiceService);

  public inputValue = '';

  public constructor() {}

  public onChange(): void {
    const videoItems = this.videoService.getFoundData();
    const newItems = this.FilterPipe.transform(videoItems, this.inputValue);
    this.videoService.setUpdatedData(newItems);
  }
}
