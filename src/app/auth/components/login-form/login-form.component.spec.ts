import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoggerService } from '@/app/core/services/logger/logger.service';
import { SnackBarService } from '@/app/shared/services/snackBar/snack-bar.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { appRoute } from '@/app/shared/constants/routes';
import { userMessage } from '@/app/shared/services/snackBar/constants/user-message';
import { stringTemplate } from '@/app/shared/utils/string-template';
import { LoginService } from '../../services/login/login.service';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let router: Router;
  let logger: LoggerService;
  let snackBar: SnackBarService;
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginFormComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: LoggerService, useValue: { logMessage: jest.fn() } },
        { provide: SnackBarService, useValue: { openSnackBar: jest.fn() } },
        { provide: LoginService, useValue: { login: jest.fn().mockReturnValue(of({})) } },
      ],
    });

    component = TestBed.createComponent(LoginFormComponent).componentInstance;
    router = TestBed.inject(Router);
    logger = TestBed.inject(LoggerService);
    snackBar = TestBed.inject(SnackBarService);
    loginService = TestBed.inject(LoginService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when email and password are valid', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'ValidPassword123!',
    });
    expect(component.loginForm.valid).toBe(true);
  });

  it('should have an invalid form when email is invalid', () => {
    component.loginForm.setValue({
      email: 'invalid-email',
      password: 'ValidPassword123!',
    });
    expect(component.loginForm.invalid).toBe(true);
  });

  it('should call loginService.login and navigate on valid form submission', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'ValidPassword123!',
    });
    component.onSubmit();
    expect(loginService.login).toHaveBeenCalledWith('test@example.com');
    expect(router.navigate).toHaveBeenCalledWith([appRoute.MAIN]);
    expect(logger.logMessage).toHaveBeenCalledWith(
      stringTemplate(userMessage.LOGGER_LOGIN, { email: 'test@example.com' }),
    );
  });

  it('should call snackBar.openSnackBar on login error', () => {
    jest.spyOn(loginService, 'login').mockImplementation(() => {
      throw new Error('Error');
    });
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'ValidPassword123!',
    });
    component.onSubmit();
    expect(snackBar.openSnackBar).toHaveBeenCalledWith(userMessage.ERROR);
  });

  it('should update errorMessage correctly', () => {
    const errors = {
      lowerCase: 'Lowercase character required',
      upperCase: 'Uppercase character required',
      number: 'Number required',
      specialCharacter: 'Special character required',
      minLength: 'Minimum length required',
    };
    component.updateErrorMessage(errors);
    expect(component.errorMessage()).toBe('Lowercase character required');
  });
});
