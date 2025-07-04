import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn } from '@angular/router';
import { isBoolean } from '../../utils/is-boolean-guard';

export const adminGuard: CanActivateFn = async (
  route,
  state,
  auth = inject(Auth)
) => {
  const user = auth.currentUser;
  if (!user) return false;

  const token = (await user.getIdTokenResult(true)).claims['admin'];
  return isBoolean(token) ? token : false;
};
