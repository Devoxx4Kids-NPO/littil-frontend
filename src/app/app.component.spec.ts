import { AuthService } from '@auth0/auth0-angular';
import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { LittilConfig, LITTILCONFIG } from '../littilConfig';
import { AppComponent } from './app.component';
import { ContentContainerComponent } from './components/content-container/content-container.component';
import { MainMenuButtonComponent } from './components/main-menu-button/main-menu-button.component';
import {
  MainMenuDropdownButtonComponent
} from './components/main-menu-dropdown-button/main-menu-dropdown-button.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { FeedbackFinToken } from './feedback/feedbackfin.token';
import { PermissionController } from './services/permission.controller';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let permissionController: PermissionController;
  let authService: AuthService;
  let authServiceLoginSpy: jest.SpyInstance;
  let authServiceLogoutSpy: jest.SpyInstance;

  const createComponent = createRoutingFactory({
    component: AppComponent,
    declarations: [
      MockComponent(ContentContainerComponent),
      MockComponent(MainMenuButtonComponent),
      MockComponent(MainMenuDropdownButtonComponent),
      MockComponent(UserMenuComponent),
    ],
    providers: [
      MockProvider(AuthService, {}),
      MockProvider(PermissionController, {
        onPermissionChange: of(),
        activeAccount: undefined,
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
        useValue: ({
          apiHost: 'localhost',
        } as LittilConfig),
      },
      MockProvider(NgcCookieConsentService)
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
});
