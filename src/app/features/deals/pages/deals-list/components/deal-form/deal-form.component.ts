import { TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Deal } from '../../../../models/deal';
import { DealsService } from '../../../../services/deals.service';

@Component({
  selector: 'app-deal-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    TitleCasePipe,
    MatHint,
  ],
  templateUrl: './deal-form.component.html',
  styleUrl: './deal-form.component.scss',
})
export class DealFormComponent {
  readonly dealService = inject(DealsService);
  readonly deal = inject<Deal | null>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef);
  readonly destroyRef = inject(DestroyRef);

  readonly dealForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    purchasePrice: new FormControl<number | null>(null, Validators.required),
    address: new FormControl('', Validators.required),
    noi: new FormControl(),
    capRate: new FormControl(),
  });

  readonly flow = this.deal?.id ? 'update' : 'create';
  readonly modalTitle = this.flow === 'create' ? 'Create Deal' : 'Update Deal';
  unrealisticCapRate = false;

  ngOnInit() {
    const deal = this.deal;

    if (deal) {
      this.dealForm.patchValue(deal);
    }

    this.autoCalculateCapRate();
  }

  submit() {
    this.dialogRef.close(this.dealForm.value);
  }

  private autoCalculateCapRate(): void {
    this.dealForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.calculateCapRate());
  }

  private calculateCapRate(): void {
    const { purchasePrice, noi } = this.dealForm.getRawValue();
    const capRateControl = this.dealForm.controls.capRate;

    if (purchasePrice && noi && purchasePrice > 0) {
      const calculatedCapRate = (noi / purchasePrice) * 100;

      if (calculatedCapRate < 5 || calculatedCapRate > 12) {
        this.unrealisticCapRate = true;
      } else {
        this.unrealisticCapRate = false;
      }

      capRateControl.setValue(parseFloat(calculatedCapRate.toFixed(6)), {
        emitEvent: false,
      });
    } else {
      capRateControl.setValue(null, { emitEvent: false });
    }
  }
}
