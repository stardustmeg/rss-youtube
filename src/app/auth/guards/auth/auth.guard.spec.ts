import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { LocalStorageService } from '@/app/core/services/local-storage/local-storage.service';
import { authGuard, loginGuard } from './auth.guard';
import { LoginService } from '../../services/login/login.service';
import { FakeAuthTokenService } from '../../services/auth-token/fake-auth-token.service';
import { LOGIN_KEY } from '../../services/login/constants/login-key';

jest.mock('@angular/router');
jest.mock('../../services/login/login.service');
jest.mock('@/app/core/services/local-storage/local-storage.service');
jest.mock('@/app/shared/services/snackBar/snack-bar.service');
jest.mock('../../services/auth-token/fake-auth-token.service');

describe('authGuard and loginGuard', () => {
  let loginServiceMock: jest.Mocked<LoginService>;
  let routerMock: jest.Mocked<Router>;
  let routeMock: Partial<ActivatedRouteSnapshot>;
  let stateMock: Partial<RouterStateSnapshot>;

  const executeAuthGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  const executeLoginGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => loginGuard(...guardParameters));

  beforeEach(() => {
    const localStorageServiceMock = {
      getItem: jest.fn(),
      getUserName: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    } as jest.Mocked<LocalStorageService>;

    const fakeAuthTokenServiceMock = {
      generateToken: jest.fn(),
    } as jest.Mocked<FakeAuthTokenService>;

    loginServiceMock = {
      isLoggedIn: jest.fn(),
      getUserName: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      localStorageKey: LOGIN_KEY,
      fakeAuthTokenService: fakeAuthTokenServiceMock,
      localStorageService: localStorageServiceMock,
      checkIsLoggedIn: jest.fn(),
    } as unknown as jest.Mocked<LoginService>;

    routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    routeMock = {};
    stateMock = {};
  });

  describe('authGuard', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
    });

    it('should be created', () => {
      expect(executeAuthGuard).toBeTruthy();
    });

    it('should allow navigation if user is logged in', () => {
      loginServiceMock.isLoggedIn.mockReturnValue(true);

      const result = executeAuthGuard(routeMock as ActivatedRouteSnapshot, stateMock as RouterStateSnapshot);

      expect(result).toBe(true);
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });
  });

  describe('loginGuard', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
    });

    it('should be created', () => {
      expect(executeLoginGuard).toBeTruthy();
    });
  });
});
