import { deleteCustomCard } from '@/app/redux/actions/actions';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { CustomLinkComponent } from '@/app/shared/components/custom-link/custom-link.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, inject, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { VideoStatisticsComponent } from '../../components/video-statistics/video-statistics.component';
import { ChangeColorDirective } from '../../directives/change-color/change-color.directive';
// import { Id } from '../../models/id.model';
import { VideoDataService } from '../../services/video-data/video-data.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CustomLinkComponent,
    VideoStatisticsComponent,
    ChangeColorDirective,
    RouterLink,
    DatePipe,
    AsyncPipe,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    CustomButtonComponent,
  ],
  providers: [ChangeColorDirective, DatePipe],
  selector: 'app-detailed-info-page',
  standalone: true,
  styleUrl: './detailed-info-page.component.scss',
  templateUrl: './detailed-info-page.component.html',
})
export class DetailedInfoPageComponent implements OnDestroy {
  private store = inject(Store);

  public imageLoaded = signal(false);

  public videoService = inject(VideoDataService);

  constructor() {
    this.videoService.getVideoById();
  }

  public handleDeleteAction(id: string): void {
    this.store.dispatch(deleteCustomCard({ id }));
  }

  public handleFavoriteAction(): void {
    // console.log(id);
    //     this.videoService.detailedInfo.value!.isFavorite = !this.videoService.detailedInfo.value!.isFavorite;
  }

  public ngOnDestroy(): void {
    this.videoService.detailedInfo.set(undefined);
  }
}
