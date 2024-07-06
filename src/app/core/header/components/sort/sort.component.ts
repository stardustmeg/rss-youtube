import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule],
  selector: 'app-sort',
  standalone: true,
  styleUrl: './sort.component.scss',
  templateUrl: './sort.component.html',
})
export class SortComponent {}
