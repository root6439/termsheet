import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
} from 'rxjs';
import { HeaderModuleComponent } from '../../shared/components/header-module/header-module.component';
import { DealFilter } from './models/deal-filter';
import { DealFilterForm } from './models/deal-filter-form';

import { DialogService } from '../../shared/services/dialog.service';
import { DealFormComponent } from './components/deal-form/deal-form.component';
import { DealsFilterComponent } from './components/deals-filter/deals-filter.component';
import { DealsTableComponent } from './components/deals-table/deals-table.component';
import { Deal } from './models/deal';
import { DealsService } from './services/deals.service';

@Component({
  selector: 'app-deal-management',
  standalone: true,
  imports: [
    DealsTableComponent,
    DealsFilterComponent,
    AsyncPipe,
    HeaderModuleComponent,
  ],
  templateUrl: './deal-management.component.html',
  styleUrl: './deal-management.component.scss',
})
export class DealManagementComponent {
  readonly dealsService = inject(DealsService);
  readonly matDialog = inject(MatDialog);
  readonly dialogService = inject(DialogService);

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

  private reload() {
    this.dealsFilterForm.setValue(this.dealsFilterForm.getRawValue());
  }

  openModalDealForm(deal?: Deal) {
    const dialogRef = this.matDialog.open(DealFormComponent, {
      width: '400px',
      data: deal,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        switchMap((result) =>
          deal
            ? this.dealsService.updateDeal(result)
            : this.dealsService.createDeal(result),
        ),
      )
      .subscribe(() => this.reload());
  }

  deleteDeal(dealId: number) {
    this.dialogService
      .confirmDeletion(
        'Delete Deal',
        'Are you sure you want to delete this deal? This proccess cannot be undone.',
      )
      .pipe(switchMap(() => this.dealsService.deleteDeal(dealId)))
      .subscribe(() => this.reload());
  }
}
