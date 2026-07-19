import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo,
  STATUS,
} from 'angular-in-memory-web-api';
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

  // Intercepta requisições GET
  get(requestInfo: RequestInfo) {
    const collectionName = requestInfo.collectionName;

    // Se a requisição for para 'api/deals' e tiver qualquer parâmetro na URL
    if (collectionName === 'deals' && requestInfo.query.size > 0) {
      return this.handleFilterDeals(requestInfo);
    }

    // Se for um GET normal (ex: api/deals ou api/deals/1), segue o fluxo padrão da biblioteca
    return undefined;
  }

  private handleFilterDeals(requestInfo: RequestInfo) {
    const collection = requestInfo.collection as Deal[];
    const query = requestInfo.query; // Obtém o mapa de parâmetros da URL

    // Captura os valores enviados pelo Front-End
    const searchName = query.get('name')?.[0]?.toLowerCase();
    const minPrice = query.get('purchasePriceFrom')?.[0];
    const maxPrice = query.get('purchasePriceTo')?.[0];

    // Aplica as regras de filtragem (maior que / menor que)
    const filteredResults = collection.filter((deal) => {
      let matches = true;

      // 1. Filtro por Nome (Contém o texto / Parcial)
      if (searchName && !deal.name.toLowerCase().includes(searchName)) {
        matches = false;
      }

      // 2. Filtro de Preço Mínimo (Preço deve ser maior ou igual a)
      if (minPrice && deal.purchasePrice < Number(minPrice)) {
        matches = false;
      }

      // 3. Filtro de Preço Máximo (Preço deve ser menor ou igual a)
      if (maxPrice && deal.purchasePrice > Number(maxPrice)) {
        matches = false;
      }

      return matches;
    });

    // Retorna a resposta HTTP simulada com sucesso (200 OK)
    return requestInfo.utils.createResponse$(() => ({
      body: filteredResults,
      status: STATUS.OK,
    }));
  }

  genId(deals: Deal[]): number {
    return deals.length > 0
      ? Math.max(...deals.map((deal) => deal.id || 0)) + 1
      : 1;
  }
}
