import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deal } from '../models/deal';

@Injectable({
  providedIn: 'root',
})
export class DealsService {
  private readonly http = inject(HttpClient);

  getDeals(search: string): Observable<Deal[]> {
    return this.http.get<Deal[]>('api/deals', { params: { name: search } });
  }
}
