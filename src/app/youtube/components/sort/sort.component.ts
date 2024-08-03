import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { BASIC_SORT_OPTION } from '../../constants/sort-option';
import { SortPipe } from '../../pipes/sort/sort.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule, SortPipe, CustomButtonComponent],
  providers: [SortPipe],
  selector: 'app-sort',
  standalone: true,
  styleUrls: ['./sort.component.scss'],
  templateUrl: './sort.component.html',
})
export class SortComponent {
  private clickCounts: Record<string, number> = {
    dateAsc: 0,
    dateDesc: 0,
    viewCountAsc: 0,
    viewCountDesc: 0,
  };

  public videoService = inject(VideoDataService);

  public handleChipClick(chipType: string): void {
    this.clickCounts[chipType] += 1;

    if (this.clickCounts[chipType] % 2 === 0) {
      Object.keys(this.clickCounts).forEach((key) => {
        if (key !== chipType) {
          this.clickCounts[key] = 0;
        }
      });
      this.videoService.sortCriteria.set(BASIC_SORT_OPTION);
    }
  }
}
