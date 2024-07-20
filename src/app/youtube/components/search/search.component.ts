import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

import { SearchPipe } from '../../pipes/search/search.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';
import { DEBOUNCE_TIME, MIN_LENGTH } from './constants/number-values';

@Component({
  imports: [FormsModule, CustomButtonComponent, MatIconModule, SearchPipe, ReactiveFormsModule],
  providers: [SearchPipe],
  selector: 'app-search',
  standalone: true,
  styleUrl: './search.component.scss',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  private searchPipe = inject(SearchPipe);

  private videoService = inject(VideoDataService);

  public searchForm = new FormGroup({
    searchTerm: new FormControl(''),
  });

  public constructor() {}

  public ngOnInit(): void {
    this.searchForm
      .get('searchTerm')!
      .valueChanges.pipe(
        filter((value) => typeof value === 'string' && value.length >= MIN_LENGTH),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
      )
      .subscribe((value) => {
        if (!value) {
          this.videoService.setUpdatedData(this.videoService.getFoundData());
          return;
        }
        this.onChange(value);
      });
  }

  public onChange(value: string): void {
    if (!value) {
      return;
    }
    const videoItems = this.videoService.searchVideos(value);
    videoItems.subscribe((data) => {
      this.videoService.setFoundData(data);
      this.videoService.setUpdatedData(data);
    });
  }
}
