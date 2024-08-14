import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { API_KEY, BASE_URL } from './constants/constants';
import { ApiInterceptorFn } from './http-interceptor.service';

describe('ApiInterceptorFn', () => {
  let next: { handle: jest.MockedFunction<HttpHandler['handle']> };

  beforeEach(() => {
    next = {
      handle: jest.fn().mockReturnValue(of(new HttpResponse({ status: 200 }))),
    };
  });

  it('should add API key to the request parameters', () => {
    const req = new HttpRequest('GET', '/test');

    ApiInterceptorFn(req, next.handle).subscribe();

    expect(next.handle).toHaveBeenCalled();
    const interceptedReq = next.handle.mock.calls[0][0] as HttpRequest<unknown>;
    expect(interceptedReq.params.get('key')).toBe(API_KEY);
  });

  it('should prepend the base URL to the request URL', () => {
    const req = new HttpRequest('GET', '/test');

    ApiInterceptorFn(req, next.handle).subscribe();

    expect(next.handle).toHaveBeenCalled();
    const interceptedReq = next.handle.mock.calls[0][0] as HttpRequest<unknown>;
    expect(interceptedReq.url).toBe(`${BASE_URL}/test`);
  });
});
