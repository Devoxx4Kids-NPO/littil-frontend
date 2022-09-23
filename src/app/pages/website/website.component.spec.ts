import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { MockComponent, MockProvider } from 'ng-mocks';
import { ButtonComponent } from '../../components/button/button.component';
import { ContentContainerComponent } from '../../components/content-container/content-container.component';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';
import { MainMenuButtonComponent } from '../../components/main-menu-button/main-menu-button.component';
import { ModalController } from '../../components/modal/modal.controller';
import { WebsiteComponent } from './website.component';

describe('WebsiteComponent', () => {
  let spectator: Spectator<WebsiteComponent>;
  let modalController: ModalController;
  let modalControllerSpy: jest.SpyInstance;
  let openLoginModalSpy: jest.SpyInstance;
  const createComponent = createRoutingFactory({
    component: WebsiteComponent,
    declarations: [
      MockComponent(LoginModalComponent),
      MockComponent(ContentContainerComponent),
      MockComponent(ButtonComponent),
      MockComponent(MainMenuButtonComponent),
    ],
    providers: [MockProvider(ModalController)],
  });

  beforeEach(() => {
    spectator = createComponent();
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
      await spectator.component.openLoginModal();
      expect(modalControllerSpy).toHaveBeenCalledTimes(1);
      expect(modalControllerSpy).toHaveBeenCalledWith(LoginModalComponent);
    });
  });

  describe('Template', () => {
    it('should call openLoginModal() when clicked on Login button', async () => {
      const loginBtn = spectator.query('[data-test="login-btn"]');
      if (loginBtn) {
        spectator.click(loginBtn);
      }
      expect(openLoginModalSpy).toHaveBeenCalledTimes(1);
    });
  });
});
