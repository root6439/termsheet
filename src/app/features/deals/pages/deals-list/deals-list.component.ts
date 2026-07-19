import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
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

  readonly dealsSearchControl = new FormControl('', { nonNullable: true });

  readonly deals$ = this.dealsSearchControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    startWith(''),
    switchMap((search) => this.dealsService.getDeals(search)),
    tap((deals) => console.log('Fetched deals:', deals)),
  );
}
