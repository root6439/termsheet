import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Deal } from '../../../../models/deal';

@Component({
  selector: 'app-deals-table',
  standalone: true,
  imports: [MatTableModule, MatPaginator, CurrencyPipe],
  templateUrl: './deals-table.component.html',
  styleUrl: './deals-table.component.scss',
})
export class DealsTableComponent {
  readonly deals = input.required<Deal[]>();

  dataSource = computed(() => {
    const dataSource = new MatTableDataSource(this.deals());
    dataSource.paginator = this.paginator;
    dataSource.sort = this.sort;

    return dataSource;
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly displayedColumns: string[] = [
    'name',
    'purchasePrice',
    'address',
    'noi',
    'capRate',
  ];
}
