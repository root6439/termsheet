import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Deal } from '../../features/deals/models/deal';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataBaseService implements InMemoryDbService {
  createDb() {
    const deals: Deal[] = [
      {
        id: 1,
        name: 'Plaza Shopping Center',
        purchasePrice: 12500000,
        address: 'Av. Paulista, 1000 - São Paulo, SP',
        noi: 875000,
        capRate: 7.0,
      },
      {
        id: 2,
        name: 'Edifício Corporativo Alpha',
        purchasePrice: 8200000,
        address: 'Av. Brigadeiro Faria Lima, 4500 - São Paulo, SP',
        noi: 533000,
        capRate: 6.5,
      },
      {
        id: 3,
        name: 'Galpão Logístico Extremo Sul',
        purchasePrice: 15000000,
        address: 'Rodovia BR-101, Km 20 - Palhoça, SC',
        noi: 1200000,
        capRate: 8.0,
      },
    ];

    return { deals };
  }

  genId(deals: Deal[]): number {
    return deals.length > 0
      ? Math.max(...deals.map((deal) => deal.id || 0)) + 1
      : 1;
  }
}
