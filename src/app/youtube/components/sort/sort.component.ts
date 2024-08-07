import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { BASIC_SORT_OPTION } from '../../constants/sort-option';
import { SortPipe } from '../../pipes/sort/sort.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';
import { SortOptionType } from './helper/isSortCriterion.helper';

interface ChipsInfo {
  count: number;
  value: SortOptionType;
}

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
  private chipsInfo: Record<string, ChipsInfo> = {
    dateAsc: {
      count: 0,
      value: { criterion: 'date', direction: 'asc' },
    },
    dateDesc: {
      count: 0,
      value: { criterion: 'date', direction: 'desc' },
    },
    viewCountAsc: {
      count: 0,
      value: { criterion: 'viewCount', direction: 'asc' },
    },
    viewCountDesc: {
      count: 0,
      value: { criterion: 'viewCount', direction: 'desc' },
    },
  };

  public videoService = inject(VideoDataService);

  public handleChipClick(chipType: string): void {
    this.chipsInfo[chipType].count += 1;
    const isOddClick = this.chipsInfo[chipType].count % 2 !== 0;

    if (isOddClick) {
      this.videoService.sortCriteria.set(this.chipsInfo[chipType].value);
    } else {
      this.videoService.sortCriteria.set(BASIC_SORT_OPTION);
    }

    Object.keys(this.chipsInfo).forEach((key) => {
      if (key !== chipType) {
        this.chipsInfo[key].count = 0;
      }
    });
  }
}
