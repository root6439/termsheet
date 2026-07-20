import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ConfirmConfig } from '../../models/confirm-config';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogClose,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  readonly data = inject<ConfirmConfig>(MAT_DIALOG_DATA);
  readonly title = this.data.title;
  readonly message = this.data.message;
  readonly confirmButtonLabel = this.data.confirmButtonLabel;
  readonly confirmButtonColor = this.data.confirmButtonColor;
}
