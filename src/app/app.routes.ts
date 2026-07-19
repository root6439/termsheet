import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'deals',
    loadComponent: () =>
      import('./features/deals/pages/deals-list/deals-list.component').then(
        (c) => c.DealsListComponent,
      ),
  },
  {
    path: 'deals/create',
    loadComponent: () =>
      import('./features/deals/pages/create-deal/create-deal.component').then(
        (c) => c.CreateDealComponent,
      ),
  },
  {
    path: 'deals/edit/:id',
    loadComponent: () =>
      import('./features/deals/pages/create-deal/create-deal.component').then(
        (c) => c.CreateDealComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'deals',
    pathMatch: 'full',
  },
];
