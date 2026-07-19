import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
} from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { DealFilter } from '../../models/deal-filter';
import { DealFilterForm } from '../../models/deal-filter-form';
import { DealsService } from '../../services/deals.service';
import { DealFormComponent } from './components/deal-form/deal-form.component';
import { DealsFilterComponent } from './components/deals-filter/deals-filter.component';
import { DealsTableComponent } from './components/deals-table/deals-table.component';

@Component({
  selector: 'app-deals-list',
  standalone: true,
  imports: [
    DealsTableComponent,
    DealsFilterComponent,
    AsyncPipe,
    MatIcon,
    MatButton,
  ],
  templateUrl: './deals-list.component.html',
  styleUrl: './deals-list.component.scss',
})
export class DealsListComponent {
  readonly dealsService = inject(DealsService);
  readonly matDialog = inject(MatDialog);
  readonly authService = inject(AuthService);

  readonly dealsFilterForm = new FormGroup<DealFilterForm>({
    name: new FormControl(),
    purchasePriceFrom: new FormControl(),
    purchasePriceTo: new FormControl(),
  });

  readonly deals$ = this.dealsFilterForm.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    startWith(''),
    switchMap((filter) => this.dealsService.getDeals(filter as DealFilter)),
  );

  readonly isAdmin = this.authService.isAdmin;

  onAddDeal() {
    const dialogRef = this.matDialog.open(DealFormComponent, {
      width: '400px',
      data: null,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        switchMap((result) => this.dealsService.createDeal(result)),
      )
      .subscribe(() => {
        this.dealsFilterForm.setValue(this.dealsFilterForm.getRawValue());
      });
  }
}
