import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-favorites-page',
  standalone: true,
  styleUrl: './favorites-page.component.scss',
  templateUrl: './favorites-page.component.html',
})
export class FavoritesPageComponent {}
