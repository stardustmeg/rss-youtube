import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';

import VideoItem from '../../models/video-item.model';
import { SortPipe } from '../../pipes/sort/sort.pipe';
import { VideoServiceService } from '../../services/video-service/video-service.service';
import { SortCriteria, isSortCriteria } from './helper/isSortCriteria.helper';

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
  selectedSortOption: SortCriteria = { criteria: '', direction: '' };

  sortCriterion = '';

  sortDirection = '';

  videoItems: VideoItem[] = [];

  constructor(
    private videoService: VideoServiceService,
    private sortPipe: SortPipe,
  ) {}

  ngOnInit(): void {
    this.videoService.updatedVideoItems$.subscribe((items) => {
      this.videoItems = items;
    });
  }

  onSortChange(event: MatChipListboxChange): void {
    const value: unknown = event.value;
    if (isSortCriteria(value)) {
      this.selectedSortOption = value;
      this.sortCriterion = value.criteria;
      this.sortDirection = value.direction;
      this.sortPipe.transform(this.videoItems, this.sortCriterion, this.sortDirection);
    }
  }
}
