import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'deals',
    loadComponent: () =>
      import('./features/deals/pages/deals-list/deals-list.component').then(
        (c) => c.DealsListComponent,
      ),
    canActivate: [authGuard],
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
