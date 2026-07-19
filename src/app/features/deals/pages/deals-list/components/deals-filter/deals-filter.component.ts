import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { DealFilterForm } from '../../../../models/deal-filter-form';

@Component({
  selector: 'app-deals-filter',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSliderModule,
  ],
  templateUrl: './deals-filter.component.html',
  styleUrl: './deals-filter.component.scss',
})
export class DealsFilterComponent {
  readonly filter = input.required<FormGroup<DealFilterForm>>();
}
