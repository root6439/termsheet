import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo,
  STATUS,
} from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
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

    const users = [
      { id: 1, name: 'Alice', email: 'alice@gmail.com', password: 'admin' },
      { id: 2, name: 'Bob', email: 'bob@gmail.com', password: 'user' },
    ];

    return { deals, users };
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

  post(requestInfo: RequestInfo): Observable<any> | undefined {
    const collectionName = requestInfo.collectionName;

    // Se o Front-End tentar disparar para um endpoint customizado de autenticação
    if (collectionName === 'users') {
      return this.handleAuthentication(requestInfo);
    }

    return undefined; // Deixa o comportamento padrão agir para as outras tabelas
  }

  private handleAuthentication(requestInfo: RequestInfo) {
    // Descobre qual a ação (Ex: se a URL for 'api/auth/login', o id será 'login')
    const usersCollection = (requestInfo.utils.getDb() as any).users; // Busca a lista de usuários do createDb()

    // Pega os dados enviados no corpo do formulário de login (email e password)
    const credentials = requestInfo.utils.getJsonBody(requestInfo.req);

    // Procura o usuário no "banco" com a combinação correta de email e senha
    const foundUser = usersCollection.find(
      (u: any) =>
        u.email === credentials.email && u.password === credentials.password,
    );

    if (foundUser) {
      // Remove a senha do objeto de resposta por segurança
      const { password, ...userWithoutPassword } = foundUser;

      // Retorna sucesso (200 OK) enviando os dados do usuário e um Token simulado
      return requestInfo.utils.createResponse$(() => ({
        status: STATUS.OK,
        body: {
          user: userWithoutPassword,
          token: 'fake-jwt-token-generico-para-o-front-end',
        },
      }));
    } else {
      // Se não encontrar, retorna erro de credenciais inválidas (401 Unauthorized)
      return requestInfo.utils.createResponse$(() => ({
        status: STATUS.UNAUTHORIZED,
        body: { message: 'E-mail ou senha incorretos.' },
      }));
    }
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
