import { AuthService } from '@auth0/auth0-angular';
import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { ContentContainerComponent } from './components/content-container/content-container.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { MainMenuButtonComponent } from './components/main-menu-button/main-menu-button.component';
import { MainMenuDropdownButtonComponent } from './components/main-menu-dropdown-button/main-menu-dropdown-button.component';
import {
  ModalController,
  ModalSize,
} from './components/modal/modal.controller';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { PermissionController } from './services/permission.controller';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let permissionController: PermissionController;
  let authService: AuthService;
  let authServiceLoginSpy: jest.SpyInstance;
  let authServiceLogoutSpy: jest.SpyInstance;
  let modalController: ModalController;
  let modalControllerSpy: jest.SpyInstance;
  let openLoginModalSpy: jest.SpyInstance;

  const createComponent = createRoutingFactory({
    component: AppComponent,
    declarations: [
      MockComponent(LoginModalComponent),
      MockComponent(ContentContainerComponent),
      MockComponent(ButtonComponent),
      MockComponent(MainMenuButtonComponent),
      MockComponent(MainMenuDropdownButtonComponent),
    ],
    providers: [
      MockProvider(ModalController),
      MockProvider(AuthService, {}),
      MockProvider(PermissionController, {
        onPermissionChange: of(),
        activeAccount: undefined,
      }),
      MockProvider(Document),
    ],
  });

  beforeEach(async () => {
    spectator = createComponent();
    permissionController = spectator.inject(PermissionController);

    authService = spectator.inject(AuthService);
    authServiceLoginSpy = jest.spyOn(authService, 'loginWithRedirect');
    authServiceLogoutSpy = jest.spyOn(authService, 'logout');

    modalController = spectator.inject(ModalController);
    modalControllerSpy = jest.spyOn(modalController, 'present');
    openLoginModalSpy = jest.spyOn(spectator.component, 'openLoginModal');

    spectator.detectChanges();
  });

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('openRegisterModal', () => {
    it('should call modalController function when openRegisterModal is called', async () => {
      spectator.component.openRegisterModal();
      expect(modalControllerSpy).toHaveBeenCalledTimes(1);
      expect(modalControllerSpy).toHaveBeenCalledWith(
        RegisterModalComponent,
        undefined,
        {
          modalSize: ModalSize.SM,
        }
      );
    });

    it('should call openRegisterModal() when clicked on Register button', () => {
      const registerBtn = spectator.query('[data-test="register-btn"]');
      if (registerBtn) {
        spectator.click(registerBtn);
      }
      expect(modalControllerSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('openLoginModal', () => {
    it('should call auth function when openLoginModal is called', () => {
      spectator.component.openLoginModal();
      expect(authServiceLoginSpy).toHaveBeenCalledTimes(1);
    });

    it('should call openLoginModal() when clicked on Login button', () => {
      const loginBtn = spectator.query('[data-test="login-btn"]');
      if (loginBtn) {
        spectator.click(loginBtn);
      }
      expect(authServiceLoginSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('logOut', () => {
    it('should call auth function whenn logOut is called', () => {
      spectator.component.logOut();
      expect(authServiceLogoutSpy).toHaveBeenCalledTimes(1);
    });

    it('should call logOut() when clicked on Logout button', () => {
      permissionController.activeAccount = { name: '' };
      permissionController.loggedIn = true;
      spectator.detectChanges();

      const logoutBtn = spectator.query('[data-test="logout-btn"]');
      if (logoutBtn) {
        spectator.click(logoutBtn);
      }
      expect(authServiceLogoutSpy).toHaveBeenCalledTimes(1);
    });
  });
});
