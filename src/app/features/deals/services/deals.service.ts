import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { toHttpParams } from '../../../shared/utils/to-http-params';
import { Deal } from '../models/deal';
import { DealFilter } from '../models/deal-filter';

@Injectable({
  providedIn: 'root',
})
export class DealsService {
  private readonly http = inject(HttpClient);

  getDeals(filter: DealFilter): Observable<Deal[]> {
    const params = toHttpParams(filter);
    return this.http.get<Deal[]>('api/deals', { params });
  }

  createDeal(deal: Deal): Observable<Deal> {
    return this.http.post<Deal>('api/deals', deal);
  }

  updateDeal(deal: Deal): Observable<Deal> {
    return this.http.put<Deal>(`api/deals`, deal);
  }

  deleteDeal(dealId: number): Observable<void> {
    return this.http.delete<void>(`api/deals/${dealId}`);
  }
}
