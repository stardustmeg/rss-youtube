import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

import { API_KEY, BASE_URL } from './constants/constants';

export const ApiInterceptorFn: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const apiReq = req.clone({
    setParams: { key: API_KEY },
    url: `${BASE_URL}${req.url}`,
  });
  return next(apiReq);
};
