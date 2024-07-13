import { appRoute } from '@/app/shared/constants/routes';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LoginService } from '../../services/login/login.service';

export const authGuard: CanActivateFn = async () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.getIsLoggedIn()) {
    return true;
  }
  await router.navigate([appRoute.LOGIN]);
  return false;
};
