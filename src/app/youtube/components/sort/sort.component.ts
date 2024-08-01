import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';

import { BASIC_SORT_OPTION } from '../../constants/sort-option';
import { VideoItem } from '../../models/video-item.model';
import { SortPipe } from '../../pipes/sort/sort.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';
import { SortOptionType, isSortOptionType } from './helper/isSortCriteria.helper';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule, SortPipe],
  providers: [SortPipe],
  selector: 'app-sort',
  standalone: true,
  styleUrl: './sort.component.scss',
  templateUrl: './sort.component.html',
})
export class SortComponent implements OnInit {
  private sortPipe = inject(SortPipe);

  private videoService = inject(VideoDataService);

  public selectedSortOption: SortOptionType = BASIC_SORT_OPTION;

  public sortCriterion = '';

  public sortDirection = '';

  public videoItems: VideoItem[] = [];

  constructor() {}

  public ngOnInit(): void {
    this.videoService.updatedVideoItems$.subscribe((items) => {
      if (items) {
        this.videoItems = items;
      }
    });
  }

  public onSortChange(event: MatChipListboxChange): void {
    const value: unknown = event.value;
    if (isSortOptionType(value)) {
      this.selectedSortOption = value;
      this.sortCriterion = value.criteria;
      this.sortDirection = value.direction;
      this.sortPipe.transform(this.videoItems, this.sortCriterion, this.sortDirection);
    }
  }
}
