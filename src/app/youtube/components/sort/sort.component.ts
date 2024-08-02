import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

import { SortPipe } from '../../pipes/sort/sort.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule, SortPipe],
  providers: [SortPipe],
  selector: 'app-sort',
  standalone: true,
  styleUrls: ['./sort.component.scss'],
  templateUrl: './sort.component.html',
})
export class SortComponent {
  public videoService = inject(VideoDataService);
}
