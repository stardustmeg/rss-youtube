import { ChangeDetectionStrategy, Component, OnDestroy, inject, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Subject, takeUntil } from 'rxjs';

import { BASIC_SORT_OPTION } from '../../constants/sort-option';
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
export class SortComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  private sortPipe = inject(SortPipe);

  private videoItems$ = inject(VideoDataService).updatedVideoItems$;

  public selectedSortOption = signal(BASIC_SORT_OPTION);

  constructor() {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSortChange(): void {
    this.videoItems$.pipe(takeUntil(this.destroy$)).subscribe((videos) => {
      if (videos) {
        this.sortPipe.transform(videos, {
          criterion: this.selectedSortOption().criterion,
          direction: this.selectedSortOption().direction,
        });
      }
    });
  }
}
