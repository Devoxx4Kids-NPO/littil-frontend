import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { MockProvider } from 'ng-mocks';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subject } from 'rxjs';
import { LittilConfig, LITTILCONFIG } from '../littilConfig';
import { AppComponent } from './app.component';
import { FeedbackFinToken } from './feedback/feedbackfin.token';
import { MenuType } from './pages/menu.routes';
import { PermissionController } from './services/permission.controller';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let permissionController: PermissionController;
  let authService: AuthService;
  let authServiceLoginSpy: jest.SpyInstance;
  let authServiceLogoutSpy: jest.SpyInstance;

  const onPermissionChangeSubject = new Subject<void>();

  const createComponent = createRoutingFactory({
    component: AppComponent,
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
  });

  beforeEach(async () => {
    spectator = createComponent();
    permissionController = spectator.inject(PermissionController);

    authService = spectator.inject(AuthService);
    authServiceLoginSpy = jest.spyOn(authService, 'loginWithRedirect');
    authServiceLogoutSpy = jest.spyOn(authService, 'logout');

    spectator.detectChanges();
  });

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initialize feedbackFin config and assign to window object on init', () => {
    const feedbackFin = spectator.inject(FeedbackFinToken);
    const littilConfig = spectator.inject(LITTILCONFIG);
    const documentMock = spectator.inject(DOCUMENT);

    spectator.component.ngOnInit();

    expect(feedbackFin.config.url).toBe(`${littilConfig.apiHost}/api/v1/feedback`);
    expect(feedbackFin.config.mode).toBe('form');
    expect((documentMock.defaultView as any).feedbackfin).toBe(feedbackFin);
  });

  it('should subscribe to permission changes and update menu routes', () => {
    spectator.component.ngOnInit();
    onPermissionChangeSubject.next();
    spectator.component.menuRoutes.forEach(route => {
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
    spectator.component.mobileMenuOpen = false;
    spectator.component.toggleMobileMenu();
    expect(spectator.component.mobileMenuOpen).toBe(true);

    spectator.component.toggleMobileMenu();
    expect(spectator.component.mobileMenuOpen).toBe(false);
  });

  it('should set mobileMenuOpen to false when hideMobileMenu is called', () => {
    spectator.component.mobileMenuOpen = true;
    spectator.component.hideMobileMenu();
    expect(spectator.component.mobileMenuOpen).toBe(false);
  });
});
