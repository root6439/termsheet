import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly matSnackbar = inject(MatSnackBar);

  private readonly defaultHorizontalPosition = 'right';
  private readonly defaultVerticalPosition = 'top';

  private readonly defaultDuration = 4000;

  success(message: string, duration = this.defaultDuration) {
    this.matSnackbar.open(message, 'close', {
      horizontalPosition: this.defaultHorizontalPosition,
      verticalPosition: this.defaultVerticalPosition,
      duration,
      panelClass: ['snackbar-success'],
    });
  }

  error(message: string, duration = this.defaultDuration) {
    this.matSnackbar.open(message, 'close', {
      horizontalPosition: this.defaultHorizontalPosition,
      verticalPosition: this.defaultVerticalPosition,
      duration,
      panelClass: ['snackbar-error'],
    });
  }

  info(message: string, duration = this.defaultDuration) {
    this.matSnackbar.open(message, 'close', {
      horizontalPosition: this.defaultHorizontalPosition,
      verticalPosition: this.defaultVerticalPosition,
      duration,
      panelClass: ['snackbar-info'],
    });
  }
}
