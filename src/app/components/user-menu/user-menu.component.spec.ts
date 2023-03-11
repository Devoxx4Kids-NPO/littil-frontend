import { UserMenuComponent } from './user-menu.component';
import {Spectator} from "@ngneat/spectator";
import {PermissionController} from "../../services/permission.controller";
import {AuthService} from "@auth0/auth0-angular";
import {ModalController, ModalSize} from "../modal/modal.controller";
import {createRoutingFactory} from "@ngneat/spectator/jest";
import {MockComponent, MockProvider} from "ng-mocks";
import {ContentContainerComponent} from "../content-container/content-container.component";
import {ButtonComponent} from "../button/button.component";
import {ButtonRoundedComponent} from "../button/button-rounded.component";
import {MainMenuButtonComponent} from "../main-menu-button/main-menu-button.component";
import {MainMenuDropdownButtonComponent} from "../main-menu-dropdown-button/main-menu-dropdown-button.component";
import {of} from "rxjs";
import {RegisterModalComponent} from "../register-modal/register-modal.component";

describe('UserMenuComponent', () => {
  let spectator: Spectator<UserMenuComponent>;
  let authServiceLogoutSpy: jest.SpyInstance;
  let permissionController: PermissionController;
  let authService: AuthService;
  let authServiceLoginSpy: jest.SpyInstance;
  let modalController: ModalController;
  let modalControllerSpy: jest.SpyInstance;
  let openLoginModalSpy: jest.SpyInstance;

  const createComponent = createRoutingFactory({
    component: UserMenuComponent,
    declarations: [
      MockComponent(ContentContainerComponent),
      MockComponent(ButtonComponent),
      MockComponent(ButtonRoundedComponent),
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

  describe('openRegisterModal', () => {
    it('should call modalController function when openRegisterModal is called', async () => {
      await spectator.component.openRegisterModal();
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
    it('should call auth function when logOut is called', () => {
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
