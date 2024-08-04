import { deleteCustomCard } from '@/app/redux/actions/actions';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { appRoute } from '@/app/shared/constants/routes';
import { ChangeColorDirective } from '@/app/youtube/directives/change-color/change-color.directive';
import { VideoItem } from '@/app/youtube/models/video-item.model';
import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { VideoStatisticsComponent } from '../../../video-statistics/video-statistics.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VideoStatisticsComponent, CustomButtonComponent, ChangeColorDirective, MatProgressSpinnerModule],
  providers: [ChangeColorDirective],
  selector: 'app-video-item-card',
  standalone: true,
  styleUrl: './video-item-card.component.scss',
  templateUrl: './video-item-card.component.html',
})
export class VideoItemCardComponent {
  private router = inject(Router);

  private store = inject(Store);

  public imageLoaded = signal(false);

  @Input() public video!: VideoItem;

  constructor() {}

  private handleDeleteAction(): void {
    this.store.dispatch(deleteCustomCard({ id: this.video.id.videoId }));
  }

  // private handleFavoriteAction(): void {
  //   this.video.isFavorite = !this.video.isFavorite;
  // }

  public additionalButtonHandler(): void {
    // this.video.kind === 'custom#card' ? this.handleFavoriteAction() : this.handleDeleteAction();
    this.handleDeleteAction();
  }

  public moreButtonHandler(): void {
    this.router.navigate([appRoute.DETAILED], {
      queryParams: this.video.kind === 'custom#card' ? { id: this.video.id.videoId } : { id: this.video.id },
    });
  }
}
