import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from '@/app/auth/services/login/login.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HeaderComponent } from './header.component';
import { NavigationService } from '../services/navigation/navigation.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: LoginService,
          useValue: {
            isLoggedIn: jest.fn().mockReturnValue(true),
            getUserName: jest.fn().mockReturnValue('testUser'),
          },
        },
        {
          provide: NavigationService,
          useValue: {
            isMainPage: jest.fn().mockReturnValue(true),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ q: 'test' }),
          },
        },
        {
          provide: Store,
          useValue: {
            select: jest.fn().mockReturnValue(of({})),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
