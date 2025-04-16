import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MockProvider } from 'ng-mocks';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subject } from 'rxjs';
import { LittilConfig, LITTILCONFIG } from '../littilConfig';
import { AppComponent } from './app.component';
import { FeedbackFinToken } from './feedback/feedbackfin.token';
import { MenuType } from './pages/menu.routes';
import { PermissionController } from './services/permission.controller';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let permissionController: PermissionController;
  let authService: AuthService;
  let authServiceLoginSpy: jest.SpyInstance;
  let authServiceLogoutSpy: jest.SpyInstance;

  const onPermissionChangeSubject = new Subject<void>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [CommonModule, RouterModule],
      providers: [
        MockProvider(AuthService, {}),
        MockProvider(PermissionController, {
          onPermissionChange: onPermissionChangeSubject.asObservable(),
          activeAccount: undefined,
          loggedIn: false,
          hasAdminRole: jest.fn().mockReturnValue(false),
        }),
        MockProvider(Document),
        {
          provide: FeedbackFinToken,
          useValue: {
            config: {},
          },
        },
        {
          provide: LITTILCONFIG,
          useValue: {
            apiHost: 'localhost',
          } as LittilConfig,
        },
        MockProvider(NgcCookieConsentService),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    permissionController = TestBed.inject(PermissionController);
    authService = TestBed.inject(AuthService);
    authServiceLoginSpy = jest.spyOn(authService, 'loginWithRedirect');
    authServiceLogoutSpy = jest.spyOn(authService, 'logout');
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize feedbackFin config and assign to window object on init', () => {
    const feedbackFin = TestBed.inject(FeedbackFinToken);
    const littilConfig = TestBed.inject(LITTILCONFIG);
    const documentMock = TestBed.inject(DOCUMENT);

    component.ngOnInit();

    expect(feedbackFin.config.url).toBe(`${littilConfig.apiHost}/api/v1/feedback`);
    expect(feedbackFin.config.mode).toBe('form');
    expect((documentMock.defaultView as any).feedbackfin).toBe(feedbackFin);
  });

  it('should subscribe to permission changes and update menu routes', () => {
    component.ngOnInit();
    onPermissionChangeSubject.next();
    component.menuRoutes.forEach(route => {
      console.log(route.menuText);
      if (route.type === MenuType.User) {
        expect(route.disabled).toBe(true);
      }
      if (route.type === MenuType.Admin) {
        expect(route.disabled).toBe(true);
      }
    });
  });

  it('should toggle mobileMenuOpen when toggleMobileMenu is called', () => {
    component.mobileMenuOpen = false;
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen).toBe(true);

    component.toggleMobileMenu();
    expect(component.mobileMenuOpen).toBe(false);
  });

  it('should set mobileMenuOpen to false when hideMobileMenu is called', () => {
    component.mobileMenuOpen = true;
    component.hideMobileMenu();
    expect(component.mobileMenuOpen).toBe(false);
  });
});
