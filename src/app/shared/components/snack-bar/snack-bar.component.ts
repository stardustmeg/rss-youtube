import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { snackBarAction } from './constants/actions';
import { SNACK_BAR_DURATION } from './constants/duration';
import { snackBarPosition } from './constants/position';

@Component({
  imports: [BrowserAnimationsModule],
  selector: 'app-snack-bar',
  standalone: true,
  styleUrl: './snack-bar.component.scss',
  templateUrl: './snack-bar.component.html',
})
export class SnackBarComponent {
  private snackBar: MatSnackBar = inject(MatSnackBar);

  public constructor() {}

  public openSnackBar(
    message = '',
    action: string = snackBarAction.CHECK,
    params: {
      duration: number;
      horizontalPosition: MatSnackBarHorizontalPosition;
      verticalPosition: MatSnackBarVerticalPosition;
    } = {
      duration: SNACK_BAR_DURATION,
      horizontalPosition: snackBarPosition.END,
      verticalPosition: snackBarPosition.TOP,
    },
  ): void {
    this.snackBar.open(message, action, {
      duration: params.duration,
      horizontalPosition: params.horizontalPosition,
      verticalPosition: params.verticalPosition,
    });
  }
}
