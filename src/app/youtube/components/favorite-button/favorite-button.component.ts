import {
  addVideoToFavorite,
  addVideoToFavoriteIds,
  deleteVideoFromFavorite,
  deleteVideoFromFavoriteIds,
} from '@/app/redux/actions/actions';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { userMessage } from '@/app/shared/services/snackBar/constants/user-message';
import { SnackBarService } from '@/app/shared/services/snackBar/snack-bar.service';
import { stringTemplate } from '@/app/shared/utils/string-template';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { VideoItem } from '../../models/video-item.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CustomButtonComponent],
  selector: 'app-favorite-button',
  standalone: true,
  styleUrl: './favorite-button.component.scss',
  templateUrl: './favorite-button.component.html',
})
export class FavoriteButtonComponent {
  private snackBarService = inject(SnackBarService);

  private store = inject(Store);

  @Input() public isFavorite!: boolean;

  @Input() public video!: VideoItem;

  constructor() {}

  public handleFavoriteAction(): void {
    if (this.isFavorite) {
      this.store.dispatch(deleteVideoFromFavoriteIds({ id: this.video.id }));
      this.store.dispatch(deleteVideoFromFavorite({ id: this.video.id }));
      this.snackBarService.openSnackBar(
        stringTemplate(userMessage.VIDEO_REMOVED_FROM_FAVORITE, { title: this.video.snippet.title }),
      );
    } else {
      this.store.dispatch(addVideoToFavoriteIds({ id: this.video.id }));
      this.store.dispatch(addVideoToFavorite({ id: this.video.id, video: this.video }));
      this.snackBarService.openSnackBar(
        stringTemplate(userMessage.VIDEO_ADDED_TO_FAVORITE, { title: this.video.snippet.title }),
      );
    }
  }
}
