import { environment } from '@/environments/environment';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const ApiInterceptorFn: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const apiReq = req.clone({
    setParams: { key: environment.API_KEY },
    url: `https://www.googleapis.com/youtube/v3/${req.url}`,
  });
  return next(apiReq);
};
