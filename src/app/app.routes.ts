import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'deals',
    loadComponent: () =>
      import('./features/deals/deal-management.component').then(
        (c) => c.DealManagementComponent,
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
