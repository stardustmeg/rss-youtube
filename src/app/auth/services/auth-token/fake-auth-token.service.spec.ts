import { TestBed } from '@angular/core/testing';

import { FakeAuthTokenService } from './fake-auth-token.service';

describe('FakeAuthTokenService', () => {
  let service: FakeAuthTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeAuthTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
