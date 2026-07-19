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
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: '**',
    redirectTo: 'deals',
    pathMatch: 'full',
  },
];
