import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { SearchPipe } from '../../pipes/search/search.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';

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
    this.searchForm.get('searchTerm')!.valueChanges.subscribe((value) => {
      this.onChange(value);
    });
  }

  public onChange(value: null | string): void {
    const videoItems = this.videoService.getOriginalData();
    const newItems = value ? this.searchPipe.transform(videoItems, value) : videoItems;
    this.videoService.setUpdatedData(newItems);
    this.videoService.setFoundData(newItems);
  }
}
