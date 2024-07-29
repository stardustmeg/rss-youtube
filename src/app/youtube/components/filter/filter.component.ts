import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';

import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIcon,
    CustomButtonComponent,
    FilterPipe,
    ReactiveFormsModule,
  ],
  providers: [FilterPipe],
  selector: 'app-filter',
  standalone: true,
  styleUrl: './filter.component.scss',
  templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  private filterPipe = inject(FilterPipe);

  private videoService = inject(VideoDataService);

  public filterControl = new FormControl('');

  public constructor() {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.filterControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.onChange(value);
    });
  }

  public onChange(value: null | string): void {
    const videoItems = this.videoService.getFoundData();
    const newItems = value ? this.filterPipe.transform(videoItems, value) : videoItems;
    this.videoService.setUpdatedData(newItems);
  }
}
