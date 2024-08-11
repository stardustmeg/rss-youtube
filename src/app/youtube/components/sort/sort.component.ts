import { isKeyOf } from '@/app/shared/helpers/isKeyOf';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { BASIC_SORT_OPTION } from '../../constants/sort-option';
import { SortPipe } from '../../pipes/sort/sort.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';
import { ChipOptionType, ChipsInfo, chipOption, criteriaValues } from './constants/sortCriteria';

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
  public videoService = inject(VideoDataService);

  private chipsInfo: Record<ChipOptionType, ChipsInfo> = {
    dateAsc: {
      count: 0,
      value: criteriaValues.dateAsc,
    },
    dateDesc: {
      count: 0,
      value: criteriaValues.dateDesc,
    },
    viewCountAsc: {
      count: 0,
      value: criteriaValues.viewCountAsc,
    },
    viewCountDesc: {
      count: 0,
      value: criteriaValues.viewCountDesc,
    },
  };

  public handleChipClick(chipType: ChipOptionType): void {
    this.chipsInfo[chipType].count += 1;
    const isOddClick = this.chipsInfo[chipType].count % 2 !== 0;

    if (isOddClick) {
      this.videoService.sortCriteria.set(this.chipsInfo[chipType].value);
    } else {
      this.videoService.sortCriteria.set(BASIC_SORT_OPTION);
    }

    Object.keys(this.chipsInfo).forEach((key) => {
      if (key !== chipType && isKeyOf(chipOption, key)) {
        this.chipsInfo[key].count = 0;
      }
    });
  }
}
