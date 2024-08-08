import { NavigationService } from '@/app/core/services/navigation/navigation.service';
import { searchVideos } from '@/app/redux/actions/actions';
import { selectNextPage } from '@/app/redux/selectors/selectors';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CustomButtonComponent } from '../components/custom-button/custom-button.component';

@Component({
  imports: [CustomButtonComponent],
  selector: 'app-pagination',
  standalone: true,
  styleUrl: './pagination.component.scss',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit, OnDestroy {
  private navigationService = inject(NavigationService);

  private nextPage$ = inject(Store).select(selectNextPage);

  private previousPage$ = inject(Store).select(selectNextPage);

  private store = inject(Store);

  private subscription = new Subscription();

  public nextPage = signal<string>('');

  public previousPage = signal<string>('');

  constructor() {}

  public moveToNextPage(): void {
    this.store.dispatch(searchVideos({ pageToken: this.nextPage(), query: this.navigationService.queryParams()['q'] }));
  }

  public moveToPreviousPage(): void {
    this.store.dispatch(
      searchVideos({ pageToken: this.previousPage(), query: this.navigationService.queryParams()['q'] }),
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.previousPage$.subscribe((previousPage) => {
        this.previousPage.set(previousPage);
      }),
    );
    this.subscription.add(
      this.nextPage$.subscribe((nextPage) => {
        this.nextPage.set(nextPage);
      }),
    );
  }
}
