import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Deal } from '../../../../models/deal';

@Component({
  selector: 'app-deals-table',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe],
  templateUrl: './deals-table.component.html',
  styleUrl: './deals-table.component.scss',
})
export class DealsTableComponent {
  readonly deals = input.required<Deal[]>();

  readonly displayedColumns: string[] = [
    'name',
    'purchasePrice',
    'address',
    'noi',
    'capRate',
  ];
}
