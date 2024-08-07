import { addVideoToFavorite, deleteVideoFromFavorite } from '@/app/redux/actions/actions';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';

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

  constructor() {}

  public handleFavoriteAction(id: string): void {
    if (this.isFavorite) {
      this.store.dispatch(deleteVideoFromFavorite({ id }));
    } else {
      this.store.dispatch(addVideoToFavorite({ id }));
    }
  }
}
