import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { snackBarAction } from './constants/actions';
import { SNACK_BAR_DURATION } from './constants/duration';
import { snackBarPosition } from './constants/position';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
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
      horizontalPosition: snackBarPosition.START,
      verticalPosition: snackBarPosition.BOTTOM,
    },
  ): void {
    this.snackBar.open(message, action, {
      duration: params.duration,
      horizontalPosition: params.horizontalPosition,
      verticalPosition: params.verticalPosition,
    });
  }
}
