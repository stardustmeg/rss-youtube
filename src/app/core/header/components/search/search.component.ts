import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { VideoServiceService } from '@/app/shared/services/video-service/video-service.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [FormsModule, CustomButtonComponent, MatIconModule],
  selector: 'app-search',
  standalone: true,
  styleUrl: './search.component.scss',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  constructor(private videoService: VideoServiceService) {}

  handleSubmit(): void {
    this.videoService.getVideos();
  }
}
