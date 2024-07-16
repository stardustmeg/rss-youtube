import { appRoute } from '@/app/shared/constants/routes';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LoginService } from '../../services/login/login.service';

export const authGuard: CanActivateFn = () =>
  inject(LoginService).checkIsLoggedIn() || inject(Router).navigate([appRoute.LOGIN]);
