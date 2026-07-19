import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-deals-filter',
  standalone: true,
  imports: [MatFormField, MatInput, MatLabel, ReactiveFormsModule],
  templateUrl: './deals-filter.component.html',
  styleUrl: './deals-filter.component.scss',
})
export class DealsFilterComponent {
  readonly fc = input.required<FormControl<string>>();
}
