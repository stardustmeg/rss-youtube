import { NavigationService } from '@/app/core/services/navigation/navigation.service';
import { deleteCustomCard } from '@/app/redux/actions/actions';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { appRoute } from '@/app/shared/constants/routes';
import { userMessage } from '@/app/shared/services/snackBar/constants/user-message';
import { SnackBarService } from '@/app/shared/services/snackBar/snack-bar.service';
import { stringTemplate } from '@/app/shared/utils/string-template';
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

  private snackBarService = inject(SnackBarService);

  private store = inject(Store);

  @Input() public id!: string;

  @Input() public videoTitle!: string;

  constructor() {}

  public handleDeleteAction(): void {
    this.store.dispatch(deleteCustomCard({ id: this.id }));
    this.snackBarService.openSnackBar(stringTemplate(userMessage.CARD_DELETED, { title: this.videoTitle }));
    if (!this.navigationService.isMainPage()) {
      this.router.navigate([appRoute.MAIN]);
    }
  }
}
