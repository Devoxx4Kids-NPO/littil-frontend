import { AuthService } from '@auth0/auth0-angular';
import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { MockComponent, MockProvider } from 'ng-mocks';
import { ButtonComponent } from '../../components/button/button.component';
import { ModalController } from '../../components/modal/modal.controller';
import {
  LoginModalComponent,
  LoginType,
} from '../login-modal/login-modal.component';
import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let spectator: Spectator<HomepageComponent>;
  let modalController: ModalController;
  let modalControllerSpy: jest.SpyInstance;
  let authService: AuthService;
  let authServiceSpy: jest.SpyInstance;
  let openLoginModalSpy: jest.SpyInstance;

  const createComponent = createRoutingFactory({
    component: HomepageComponent,
    declarations: [
      MockComponent(ButtonComponent),
    ],
    providers: [MockProvider(AuthService), MockProvider(ModalController)],
  });

  beforeEach(() => {
    spectator = createComponent();
    authService = spectator.inject(AuthService);
    authServiceSpy = jest.spyOn(authService, 'loginWithRedirect');
    modalController = spectator.inject(ModalController);
    modalControllerSpy = jest.spyOn(modalController, 'present');
    openLoginModalSpy = jest.spyOn(spectator.component, 'openLoginModal');
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('openLoginModal', () => {
    it('should call present modalController function [type=Login]', async () => {
      await spectator.component.openLoginModal(LoginType.Login);
      expect(modalControllerSpy).toHaveBeenCalledTimes(0);
      expect(authServiceSpy).toHaveBeenCalledTimes(1);
      expect(authServiceSpy).toHaveBeenCalledWith();
    });
    it('should call present modalController function [type=Register]', async () => {
      await spectator.component.openLoginModal(LoginType.Register);
      expect(modalControllerSpy).toHaveBeenCalledTimes(1);
      expect(modalControllerSpy).toHaveBeenCalledWith(LoginModalComponent, {
        type: LoginType.Register,
      });
    });
  });

  describe('Template', () => {
    it('should call openLoginModal() when clicked on Login button', async () => {
      const loginBtn = spectator.query('[data-test="login-btn"]');
      if (loginBtn) {
        spectator.click(loginBtn);
      }
      expect(openLoginModalSpy).toHaveBeenCalledWith(LoginType.Login);
    });
    it('should call openLoginModal() when clicked on Register button', async () => {
      const registerBtn = spectator.query('[data-test="register-btn"]');
      if (registerBtn) {
        spectator.click(registerBtn);
      }
      expect(openLoginModalSpy).toHaveBeenCalledTimes(1);
      expect(openLoginModalSpy).toHaveBeenCalledWith(LoginType.Register);
    });
  });
});
