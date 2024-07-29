import { LoginService } from '@/app/auth/services/login/login.service';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { appPath } from '@/app/shared/constants/routes';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs';

import { SearchPipe } from '../../pipes/search/search.pipe';
import { VideoDataService } from '../../services/video-data/video-data.service';
import { DEBOUNCE_TIME, MIN_LENGTH } from './constants/number-values';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CustomButtonComponent, MatIconModule, SearchPipe, ReactiveFormsModule],
  providers: [SearchPipe],
  selector: 'app-search',
  standalone: true,
  styleUrl: './search.component.scss',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  private loginService = inject(LoginService);

  private router = inject(Router);

  private videoService = inject(VideoDataService);

  public searchForm = new FormGroup({
    searchTerm: new FormControl(''),
  });

  public constructor() {}

  private clearSearchForNotLoggedIn(): void {
    this.loginService
      .isLoggedIn()
      .pipe(
        tap((isLoggedIn) => {
          if (!isLoggedIn) {
            this.searchForm.get('searchTerm')!.setValue('');
          }
        }),
      )
      .subscribe();
  }

  private updateSearchFormQuery(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const query: unknown = params['q'];
      if (query && typeof query === 'string') {
        this.searchForm.get('searchTerm')!.setValue(query);
      }
    });
  }

  public ngOnInit(): void {
    this.clearSearchForNotLoggedIn();
    this.updateSearchFormQuery();
    this.searchForm
      .get('searchTerm')!
      .valueChanges.pipe(
        filter((value) => typeof value === 'string' && value.length >= MIN_LENGTH),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
      )
      .subscribe((value) => {
        this.onSearch(value!);
      });
  }

  public onSearch(query: string): void {
    this.router.navigate([appPath.MAIN], { queryParams: { q: query } });
    this.videoService.searchVideos(query).subscribe((detailedVideos) => {
      this.videoService.setVideoData(detailedVideos);
    });
  }
}
