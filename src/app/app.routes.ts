import { Routes } from '@angular/router';
import { AppRouteSegment } from './app-route-segment';
import { adminGuard } from './shared/guards/admin/admin.guard';

export const routes: Routes = [
  {
    path: AppRouteSegment.AUTH,
    loadComponent: () =>
      import('./pages/auth-page/auth-page.component').then(
        (m) => m.AuthPageComponent
      ),
  },
  {
    canActivate: [adminGuard],
    path: AppRouteSegment.ADMIN,
    loadComponent: () =>
      import('./pages/admin-page/admin-page.component').then(
        (m) => m.AdminPageComponent
      ),
  },
  {
    path: AppRouteSegment.LANDING,
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: AppRouteSegment.LANDING,
  },
];
