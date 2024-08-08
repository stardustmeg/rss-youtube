import { NavigationService } from '@/app/core/services/navigation/navigation.service';
import { searchVideos } from '@/app/redux/actions/actions';
import { selectNextPage, selectPreviousPage } from '@/app/redux/selectors/selectors';
import { Injectable, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private navigationService = inject(NavigationService);

  private nextPage = signal<string>('');

  private nextPage$ = inject(Store).select(selectNextPage);

  private previousPage = signal<string>('');

  private previousPage$ = inject(Store).select(selectPreviousPage);

  private store = inject(Store);

  public isFirstPage = signal<boolean>(true);

  public isLastPage = signal<boolean>(true);

  constructor() {
    this.previousPage$.subscribe((previousPage) => {
      this.previousPage.set(previousPage);
      this.isFirstPage.set(this.previousPage() === '');
    });

    this.nextPage$.subscribe((nextPage) => {
      this.nextPage.set(nextPage);
      this.isLastPage.set(this.nextPage() === '');
    });
  }

  public moveToNextPage(): void {
    this.store.dispatch(searchVideos({ pageToken: this.nextPage(), query: this.navigationService.queryParams()['q'] }));
  }

  public moveToPreviousPage(): void {
    this.store.dispatch(
      searchVideos({
        pageToken: this.previousPage(),
        query: this.navigationService.queryParams()['q'],
      }),
    );
  }
}
