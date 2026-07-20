import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo,
  STATUS,
} from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Deal } from '../../features/deals/models/deal';
import { Role } from '../models/roles';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

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
        address: '5th Ave & 34th St - New York, NY',
        noi: 875000,
        capRate: 7.0,
      },
      {
        id: 2,
        name: 'Alpha Corporate Tower',
        purchasePrice: 8200000,
        address: '400 Conshohocken State Rd - Gladwyne, PA',
        noi: 533000,
        capRate: 6.5,
      },
      {
        id: 3,
        name: 'Southern Logistics Hub',
        purchasePrice: 15000000,
        address: '2100 Interstate 35 Frontage Rd - Austin, TX',
        noi: 1200000,
        capRate: 8.0,
      },
      {
        id: 4,
        name: 'Beacon Medical Center',
        purchasePrice: 6400000,
        address: '742 Evergreen Terrace - Springfield, IL',
        noi: 460800,
        capRate: 7.2,
      },
      {
        id: 5,
        name: 'Summit Tech Park',
        purchasePrice: 22000000,
        address: '101 Innovation Way - San Jose, CA',
        noi: 1430000,
        capRate: 6.5,
      },
      {
        id: 6,
        name: 'Horizon Retail Village',
        purchasePrice: 4800000,
        address: '890 Ocean Drive - Miami, FL',
        noi: 374400,
        capRate: 7.8,
      },
      {
        id: 7,
        name: 'Vanguard Industrial Complex',
        purchasePrice: 18500000,
        address: '55 Freightliner Blvd - Charlotte, NC',
        noi: 1517000,
        capRate: 8.2,
      },
      {
        id: 8,
        name: 'One Liberty Square',
        purchasePrice: 35000000,
        address: '1200 Market St - Philadelphia, PA',
        noi: 2030000,
        capRate: 5.8,
      },
      {
        id: 9,
        name: 'Midtown Mixed-Use Center',
        purchasePrice: 9100000,
        address: '430 Peachtree St - Atlanta, GA',
        noi: 627900,
        capRate: 6.9,
      },
      {
        id: 10,
        name: 'Pinnacle Storage Facility',
        purchasePrice: 3200000,
        address: '210 Industrial Pkwy - Phoenix, AZ',
        noi: 272000,
        capRate: 8.5,
      },
      {
        id: 11,
        name: 'Waterfront Business Bay',
        purchasePrice: 28000000,
        address: '50 Marina Blvd - San Francisco, CA',
        noi: 1680000,
        capRate: 6.0,
      },
      {
        id: 12,
        name: 'Legacy Senior Housing',
        purchasePrice: 7500000,
        address: '142 Walnut Ave - Denver, CO',
        noi: 555000,
        capRate: 7.4,
      },
      {
        id: 13,
        name: 'Apex Distribution Center',
        purchasePrice: 11200000,
        address: '900 Beltline Rd - Dallas, TX',
        noi: 884800,
        capRate: 7.9,
      },
      {
        id: 14,
        name: 'Metropolitan Student Living',
        purchasePrice: 13800000,
        address: '605 University Way - Boston, MA',
        noi: 938400,
        capRate: 6.8,
      },
      {
        id: 15,
        name: 'Emerald Eco-Hotel',
        purchasePrice: 16400000,
        address: '312 Rainier Ave - Seattle, WA',
        noi: 1164400,
        capRate: 7.1,
      },
    ];

    const users: User[] = [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@gmail.com',
        password: 'admin',
        role: 'admin',
      },
      {
        id: 2,
        name: 'Bob',
        email: 'bob@gmail.com',
        password: 'user',
        role: 'user',
      },
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

    // NOVA VALIDAÇÃO: Bloqueia a criação se o nome do Deal já existir
    if (collectionName === 'deals') {
      return this.handleDealRegistration(requestInfo);
    }

    return undefined; // Deixa o comportamento padrão agir para as outras tabelas
  }

  // Intercepta requisições PUT (Atualizações)
  put(requestInfo: RequestInfo): Observable<any> | undefined {
    const collectionName = requestInfo.collectionName;

    // Valida duplicidade de nome ao atualizar um Deal
    if (collectionName === 'deals') {
      return this.handleDealUpdate(requestInfo);
    }

    return undefined; // Deixa o comportamento padrão agir para outras tabelas
  }

  // Método exclusivo para validar duplicidade de nomes na ATUALIZAÇÃO de deals
  private handleDealUpdate(requestInfo: RequestInfo) {
    const db = requestInfo.utils.getDb() as any;
    const dealsCollection = db.deals as Deal[];
    const updatedDeal = requestInfo.utils.getJsonBody(requestInfo.req) as Deal;

    // Busca se existe OUTRO deal com o mesmo nome, desconsiderando o ID do deal atual
    const nameExists = dealsCollection.some(
      (deal: Deal) =>
        deal.id !== updatedDeal.id &&
        deal.name.trim().toLowerCase() ===
          updatedDeal.name.trim().toLowerCase(),
    );

    if (nameExists) {
      // Retorna erro HTTP 409 Conflict se o nome já estiver em uso por outro registro
      return requestInfo.utils.createResponse$(() => ({
        status: STATUS.CONFLICT,
        error: {
          message: `Deal with name '${updatedDeal.name}' already exists`,
        },
      }));
    }

    // Se o nome for válido ou não conflitar, retorna undefined para o In-Memory atualizar os dados salvos
    return undefined;
  }

  private handleAuthentication(requestInfo: RequestInfo) {
    // Descobre qual a ação (Ex: se a URL for 'api/auth/login', o id será 'login')
    const usersCollection = (requestInfo.utils.getDb() as any).users as User[]; // Busca a lista de usuários do createDb()

    // Pega os dados enviados no corpo do formulário de login (email e password)
    const credentials = requestInfo.utils.getJsonBody(requestInfo.req) as {
      email: string;
      password: string;
    };

    // Procura o usuário no "banco" com a combinação correta de email e senha
    const foundUser = usersCollection.find(
      (u: User) =>
        u.email === credentials.email && u.password === credentials.password,
    );

    if (foundUser) {
      // Remove a senha do objeto de resposta por segurança
      const { password, ...userWithoutPassword } = foundUser;

      // Retorna sucesso (200 OK) enviando os dados do usuário e um Token simulado
      return requestInfo.utils.createResponse$(() => ({
        status: STATUS.OK,
        body: userWithoutPassword,
      }));
    } else {
      // Se não encontrar, retorna erro de credenciais inválidas (401 Unauthorized)
      return requestInfo.utils.createResponse$(() => ({
        status: STATUS.UNAUTHORIZED,
        error: { message: 'Incorrect e-mail or password.' },
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

  // Método exclusivo para validar duplicidade de nomes em deals
  private handleDealRegistration(requestInfo: RequestInfo) {
    const db = requestInfo.utils.getDb() as any;
    const dealsCollection = db.deals as Deal[]; // Acessa os dados atuais na memória
    const newDeal = requestInfo.utils.getJsonBody(requestInfo.req) as Deal;

    // Verifica se já existe algum negócio com o mesmo nome (ignorando maiúsculas/minúsculas)
    const nameExists = dealsCollection.some(
      (deal: Deal) =>
        deal.name.trim().toLowerCase() === newDeal.name.trim().toLowerCase(),
    );

    if (nameExists) {
      // Retorna erro HTTP 409 Conflict se o nome for repetido
      return requestInfo.utils.createResponse$(() => ({
        status: STATUS.CONFLICT,
        error: {
          message: `Deal with name '${newDeal.name}' already exists`,
        },
      }));
    }

    // Se o nome for único, retorna undefined para o In-Memory gerar o ID e salvar automaticamente
    return undefined;
  }

  genId(deals: Deal[]): number {
    return deals.length > 0
      ? Math.max(...deals.map((deal) => deal.id || 0)) + 1
      : 1;
  }
}
