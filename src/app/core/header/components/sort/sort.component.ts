import VideoItem from '@/app/core/models/video-item.model';
import { SortPipe } from '@/app/shared/pipes/sort/sort.pipe';
import { VideoServiceService } from '@/app/shared/services/video-service/video-service.service';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';

import { isSortCriteria } from './helper/isSortCriteria.helper';

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

  private videoItems: VideoItem[] = [];

  private videoService = inject(VideoServiceService);

  public sortCriterion = '';

  public sortDirection = '';

  public constructor() {}

  public ngOnInit(): void {
    this.videoService.updatedVideoItems$.subscribe((items) => {
      this.videoItems = items;
    });
  }

  public onSortChange(event: MatChipListboxChange): void {
    const value: unknown = event.value;
    if (isSortCriteria(value)) {
      this.sortCriterion = value.criteria;
      this.sortDirection = value.direction;
      this.sortPipe.transform(this.videoItems, this.sortCriterion, this.sortDirection);
    }
  }
}
