import { Component, inject } from '@angular/core';

import { CustomButtonComponent } from '../components/custom-button/custom-button.component';
import { PaginationService } from '../services/pagination/pagination.service';

@Component({
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
