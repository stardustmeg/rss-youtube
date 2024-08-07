import {
  addVideoToFavorite,
  addVideoToFavoriteIds,
  deleteVideoFromFavorite,
  deleteVideoFromFavoriteIds,
} from '@/app/redux/actions/actions';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
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
  private store = inject(Store);

  @Input() public id!: string;

  @Input() public isFavorite!: boolean;

  @Input() public video!: VideoItem;

  constructor() {}

  public handleFavoriteAction(id: string, video: VideoItem): void {
    if (this.isFavorite) {
      this.store.dispatch(deleteVideoFromFavoriteIds({ id }));
      this.store.dispatch(deleteVideoFromFavorite({ id }));
    } else {
      this.store.dispatch(addVideoToFavoriteIds({ id }));
      this.store.dispatch(addVideoToFavorite({ id, video }));
    }
  }
}
