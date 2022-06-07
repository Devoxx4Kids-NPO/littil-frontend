import { AuthService } from '@auth0/auth0-angular';
import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { MockComponent, MockProvider } from 'ng-mocks';
import { ButtonComponent } from '../../components/button/button.component';
import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let spectator: Spectator<HomepageComponent>;
  let authService: AuthService;
  let authServiceSpy: jest.SpyInstance;
  let openLoginModalSpy: jest.SpyInstance;

  const createComponent = createRoutingFactory({
    component: HomepageComponent,
    declarations: [
      MockComponent(ButtonComponent),
    ],
    providers: [MockProvider(AuthService)],
  });

  beforeEach(() => {
    spectator = createComponent();
    authService = spectator.inject(AuthService);
    authServiceSpy = jest.spyOn(authService, 'loginWithRedirect');
    openLoginModalSpy = jest.spyOn(spectator.component, 'openLoginModal');
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('openLoginModal', () => {
    it('should call present authService login function', async () => {
      await spectator.component.openLoginModal();
      expect(authServiceSpy).toHaveBeenCalledTimes(1);
      expect(authServiceSpy).toHaveBeenCalledWith();
    });
  });

  describe('Template', () => {
    it('should call openLoginModal() when clicked on Login button', async () => {
      const loginBtn = spectator.query('[data-test="login-btn"]');
      if (loginBtn) {
        spectator.click(loginBtn);
      }
      expect(openLoginModalSpy).toHaveBeenCalledTimes(1);
      expect(openLoginModalSpy).toHaveBeenCalledWith();
    });
    it('should call openLoginModal() when clicked on Register button', async () => {
      const registerBtn = spectator.query('[data-test="register-btn"]');
      if (registerBtn) {
        spectator.click(registerBtn);
      }
      expect(openLoginModalSpy).toHaveBeenCalledTimes(1);
      expect(openLoginModalSpy).toHaveBeenCalledWith();
    });
  });
});
