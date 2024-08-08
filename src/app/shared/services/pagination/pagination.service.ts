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

  private nextPageSignal = toSignal(inject(Store).select(selectNextPage), { initialValue: '' });

  private previousPageSignal = toSignal(inject(Store).select(selectPreviousPage), { initialValue: '' });

  private store = inject(Store);

  public isFirstPage = computed(() => this.previousPageSignal() === '');

  public isLastPage = computed(() => this.nextPageSignal() === '');

  constructor() {}

  public moveToNextPage(): void {
    this.store.dispatch(
      searchVideos({ pageToken: this.nextPageSignal(), query: this.navigationService.queryParams()['q'] }),
    );
  }

  public moveToPreviousPage(): void {
    this.store.dispatch(
      searchVideos({
        pageToken: this.previousPageSignal(),
        query: this.navigationService.queryParams()['q'],
      }),
    );
  }
}
