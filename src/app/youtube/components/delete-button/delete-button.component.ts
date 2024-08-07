import { NavigationService } from '@/app/core/services/navigation/navigation.service';
import { deleteCustomCard } from '@/app/redux/actions/actions';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { appRoute } from '@/app/shared/constants/routes';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CustomButtonComponent],
  selector: 'app-delete-button',
  standalone: true,
  styleUrl: './delete-button.component.scss',
  templateUrl: './delete-button.component.html',
})
export class DeleteButtonComponent {
  private navigationService = inject(NavigationService);

  private router = inject(Router);

  private store = inject(Store);

  @Input() public id!: string;

  constructor() {}

  public handleDeleteAction(id: string): void {
    this.store.dispatch(deleteCustomCard({ id }));
    if (!this.navigationService.isMainPage()) {
      this.router.navigate([appRoute.MAIN]);
    }
  }
}
