import VideoItem from '@/app/core/models/video-item.model';
import { SortPipe } from '@/app/shared/pipes/sort/sort.pipe';
import { VideoServiceService } from '@/app/shared/services/video-service/video-service.service';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';

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
  sortCriterion = '';

  sortDirection = '';

  sortPipe = inject(SortPipe);

  videoItems: VideoItem[] = [];

  videoService = inject(VideoServiceService);

  constructor() {}

  ngOnInit(): void {
    this.videoService.updatedVideoItems$.subscribe((items) => {
      this.videoItems = items;
    });
  }

  onSortChange(event: MatChipListboxChange): void {
    this.sortCriterion = event.value.criteria;
    this.sortDirection = event.value.direction;
    this.sortPipe.transform(this.videoItems, this.sortCriterion, this.sortDirection);
  }
}
