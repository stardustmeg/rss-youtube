import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PaginationService } from '../../services/pagination/pagination.service';
import { CustomButtonComponent } from '../custom-button/custom-button.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CustomButtonComponent],
  selector: 'app-pagination',
  standalone: true,
  styleUrl: './pagination.component.scss',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  public paginationService = inject(PaginationService);

  constructor() {}

  public moveToNextPage(): void {
    this.paginationService.moveToNextPage();
  }

  public moveToPreviousPage(): void {
    this.paginationService.moveToPreviousPage();
  }
}
