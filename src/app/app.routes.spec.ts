import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { appPath } from './shared/constants/routes';
import { LoginService } from './auth/services/login/login.service';
import { LocalStorageService } from './core/services/local-storage/local-storage.service';
import { SnackBarService } from './shared/services/snackBar/snack-bar.service';
import { FakeAuthTokenService } from './auth/services/auth-token/fake-auth-token.service';

describe('AppRoutingModule', () => {
  let router: Router;
  let location: Location;
  let loginService: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), BrowserAnimationsModule],
      providers: [
        LoginService,
        LocalStorageService,
        SnackBarService,
        {
          provide: FakeAuthTokenService,
          useValue: {
            generateToken: jest.fn().mockReturnValue('testToken'),
          },
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    loginService = TestBed.inject(LoginService);
    router.initialNavigation();
  });

  it('should navigate to LOGIN page if not authenticated', fakeAsync(() => {
    loginService.logout();
    router.navigate([appPath.MAIN]);
    tick();
    expect(location.path()).toBe('/login');
  }));

  it('should navigate to MAIN page if authenticated', fakeAsync(() => {
    loginService.login('testUser');
    router.navigate([appPath.MAIN]);
    tick();
    expect(location.path()).toBe('/main');
  }));

  it('should navigate to LOGIN page if not authenticated', fakeAsync(() => {
    loginService.logout();
    router.navigate([appPath.DETAILED]);
    tick();
    expect(location.path()).toBe('/login');
  }));

  it('should navigate to DETAILED page', fakeAsync(() => {
    loginService.login('testUser');
    router.navigate([appPath.DETAILED]);
    tick();
    expect(location.path()).toBe('/detailed');
  }));

  it('should navigate to LOGIN page if not authenticated', fakeAsync(() => {
    loginService.logout();
    router.navigate([appPath.LOGIN]);
    tick();
    expect(location.path()).toBe('/login');
  }));

  it('should navigate to LOGIN page', fakeAsync(() => {
    loginService.logout();
    router.navigate([appPath.ADMIN]);
    tick();
    expect(location.path()).toBe('/login');
  }));

  it('should navigate to ADMIN page', fakeAsync(() => {
    loginService.login('testUser');
    router.navigate([appPath.ADMIN]);
    tick();
    expect(location.path()).toBe('/admin');
  }));

  it('should navigate to LOGIN page', fakeAsync(() => {
    loginService.logout();
    router.navigate([appPath.FAVORITES]);
    tick();
    expect(location.path()).toBe('/login');
  }));

  it('should navigate to FAVORITES page', fakeAsync(() => {
    loginService.login('testUser');
    router.navigate([appPath.FAVORITES]);
    tick();
    expect(location.path()).toBe('/favorites');
  }));

  it('should redirect to NOT_FOUND page for unknown paths', fakeAsync(() => {
    router.navigate(['unknown']);
    tick();
    expect(location.path()).toBe('/404');
  }));
});
