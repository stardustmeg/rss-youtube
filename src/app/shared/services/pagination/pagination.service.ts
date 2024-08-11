import { NavigationService } from '@/app/core/services/navigation/navigation.service';
import { searchVideos } from '@/app/redux/actions/actions';
import { selectNextPage, selectPreviousPage } from '@/app/redux/selectors/selectors';
import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private navigationService = inject(NavigationService);
  private store = inject(Store);

  private nextPageSignal = toSignal(this.store.select(selectNextPage), { initialValue: '' });
  private previousPageSignal = toSignal(this.store.select(selectPreviousPage), { initialValue: '' });

  public currentPage = computed(() => Number(this.navigationService.queryParams()['page'] || 1));
  public isFirstPage = computed(() => this.previousPageSignal() === '');
  public isLastPage = computed(() => this.nextPageSignal() === '');

  constructor() {}

  private dispatchSearchVideos(pageToken: string): void {
    this.store.dispatch(
      searchVideos({
        pageToken,
        query: this.navigationService.queryParams()['q'],
      }),
    );
  }

  private hasQuery(): boolean {
    return this.navigationService.queryParams()['q'] !== undefined;
  }

  private updatePage(page: number): void {
    this.navigationService.updateQueryParams({ page });
  }

  public moveToNextPage(): void {
    if (this.hasQuery()) {
      this.updatePage(this.currentPage() + 1);
      this.dispatchSearchVideos(this.nextPageSignal());
    }
  }

  public moveToPreviousPage(): void {
    if (this.hasQuery()) {
      this.updatePage(this.currentPage() - 1);
      this.dispatchSearchVideos(this.previousPageSignal());
    }
  }
}
