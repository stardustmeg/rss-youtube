import { TestBed } from '@angular/core/testing';
import { FakeAuthTokenService } from './fake-auth-token.service';

declare let crypto: {
  randomUUID: () => string;
};

describe('FakeAuthTokenService', () => {
  let service: FakeAuthTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeAuthTokenService],
    });
    service = TestBed.inject(FakeAuthTokenService);

    crypto.randomUUID = jest.fn(() => '00000000-0000-4000-8000-000000000000');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a valid UUID token', () => {
    const token = service.generateToken();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuidRegex.test(token)).toBe(true);
  });

  it('should generate different tokens on subsequent calls', () => {
    crypto.randomUUID = jest
      .fn()
      .mockReturnValueOnce('00000000-0000-4000-8000-000000000001')
      .mockReturnValueOnce('00000000-0000-4000-8000-000000000002');
    const token1 = service.generateToken();
    const token2 = service.generateToken();
    expect(token1).not.toBe(token2);
  });
});
