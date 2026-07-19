import { FormControl } from '@angular/forms';

export interface DealFilterForm {
  name: FormControl<string | null>;
  purchasePriceFrom: FormControl<number | null>;
  purchasePriceTo: FormControl<number | null>;
}
