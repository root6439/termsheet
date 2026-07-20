import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output, viewChild } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Deal } from '../../models/deal';

@Component({
  selector: 'app-deals-table',
  standalone: true,
  imports: [
    MatTableModule,
    CurrencyPipe,
    MatIconButton,
    MatIcon,
    MatPaginator,
    MatSort,
    MatSortHeader,
  ],
  templateUrl: './deals-table.component.html',
  styleUrl: './deals-table.component.scss',
})
export class DealsTableComponent {
  readonly matPaginator = viewChild.required(MatPaginator);
  readonly matSort = viewChild.required(MatSort);

  readonly deals = input.required<Deal[]>();
  readonly showActions = input.required<boolean>();

  readonly dataSource = computed(() => {
    const dataSource = new MatTableDataSource(this.deals());
    dataSource.paginator = this.matPaginator();
    dataSource.sort = this.matSort();
    return dataSource;
  });

  readonly edit = output<Deal>();
  readonly delete = output<number>();

  readonly displayedColumns = computed(() => {
    const columns: string[] = [
      'name',
      'purchasePrice',
      'address',
      'noi',
      'capRate',
    ];

    if (this.showActions()) {
      columns.push('actions');
    }

    return columns;
  });
}
