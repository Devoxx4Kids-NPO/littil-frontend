import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { CompleteProfileModalComponent } from '../../components/complete-profile-modal/complete-profile-modal.component';
import { ModalController } from '../../components/modal/modal.controller';
import { PermissionController } from '../../services/permission.controller';
import { CompleteProfilePageComponent } from './complete-profile.component';

describe('CompleteProfilePageComponent', () => {
  let spectator: Spectator<CompleteProfilePageComponent>;
  let router: Router;
  let modalController: ModalController;
  let permissionController: PermissionController;
  let authService: AuthService;

  const createComponent = createRoutingFactory({
    component: CompleteProfilePageComponent,
    declarations: [MockComponent(CompleteProfileModalComponent)],
    imports: [RouterTestingModule],
    providers: [
      MockProvider(Router, {
        navigateByUrl: () => Promise.resolve(true),
      }),
      MockProvider(PermissionController, {
        hasAnyRole: (): boolean => true,
      }),
      MockProvider(ModalController, {
        present: (): any => Promise.resolve(),
      }),
      MockProvider(AuthService, {
        getAccessTokenSilently: () => of(),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();

    router = spectator.inject(Router);
    authService = spectator.inject(AuthService);
    jest.spyOn(authService, 'getAccessTokenSilently');
    permissionController = spectator.inject(PermissionController);
    modalController = spectator.inject(ModalController);
    jest.spyOn(modalController, 'present');
  });

  describe('ngOnInit', () => {
    it('should navigate to search page if roles are set', async () => {
      expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/admin/search');
      expect(modalController.present).not.toHaveBeenCalled();
      expect(authService.getAccessTokenSilently).not.toHaveBeenCalled();
    });
  });
});
