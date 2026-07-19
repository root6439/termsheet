import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { DealFilter } from '../../models/deal-filter';
import { DealFilterForm } from '../../models/deal-filter-form';
import { DealsService } from '../../services/deals.service';
import { DealsFilterComponent } from './components/deals-filter/deals-filter.component';
import { DealsTableComponent } from './components/deals-table/deals-table.component';

@Component({
  selector: 'app-deals-list',
  standalone: true,
  imports: [DealsTableComponent, DealsFilterComponent, AsyncPipe],
  templateUrl: './deals-list.component.html',
  styleUrl: './deals-list.component.scss',
})
export class DealsListComponent {
  readonly dealsService = inject(DealsService);

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
}
