import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataBaseService implements InMemoryDbService {
  createDb() {
    const produtos = [
      { id: 1, nome: 'Teclado Mecânico', preco: 299.9 },
      { id: 2, nome: 'Mouse Gamer', preco: 150.0 },
      { id: 3, nome: 'Monitor 24" IPS', preco: 899.0 },
    ];

    // O nome da chave ('produtos') define o endpoint da URL (/api/produtos)
    return { produtos };
  }
}
