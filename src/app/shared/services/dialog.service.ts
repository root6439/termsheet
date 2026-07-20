import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmConfig } from '../models/confirm-config';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly matDialog = inject(MatDialog);

  confirm(config: ConfirmConfig) {
    return this.matDialog
      .open(ConfirmationDialogComponent, {
        data: config,
      })
      .afterClosed()
      .pipe(filter((confirmed: boolean) => confirmed));
  }

  confirmDeletion(title: string, message: string) {
    const config: ConfirmConfig = {
      title,
      message,
      confirmButtonColor: 'warn',
      confirmButtonLabel: 'Delete',
    };

    return this.confirm(config);
  }

  constructor() {}
}
