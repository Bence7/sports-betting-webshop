import { inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { AppRouteSegment } from '../../../app-route-segment';

export const authGuard: CanActivateFn = (
  route,
  state,
  auth = inject(Auth),
  router = inject(Router)
) =>
  new Promise((resolve) =>
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      } else {
        router.navigate([AppRouteSegment.AUTH]);
        resolve(false);
      }
    })
  );
