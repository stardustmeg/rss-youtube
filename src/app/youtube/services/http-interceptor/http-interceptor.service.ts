import { environment } from '@/environments/environment';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

const API_KEY = environment.API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/';

export const ApiInterceptorFn: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const apiReq = req.clone({
    setParams: { key: API_KEY },
    url: `${BASE_URL}${req.url}`,
  });
  return next(apiReq);
};
