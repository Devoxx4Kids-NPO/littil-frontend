import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { MockProvider } from 'ng-mocks';
import { ModalController } from '../../components/modal/modal.controller';
import { PermissionController } from '../../services/permission.controller';
import { CompleteProfilePageComponent } from './complete-profile.component';

describe('CompleteProfilePageComponent', () => {
  let spectator: Spectator<CompleteProfilePageComponent>;
  let router: Router;
  let modalController: ModalController;
  let permissionController: PermissionController;

  const createComponent = createRoutingFactory({
    component: CompleteProfilePageComponent,
    declareComponent: false,
    imports: [RouterTestingModule],
    providers: [
      MockProvider(Router, {
        navigateByUrl: () => Promise.resolve(true),
      }),
      MockProvider(PermissionController, {
        hasAnyRole: (): boolean => false,
      }),
      MockProvider(ModalController, {
        present: (): any => Promise.resolve(),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();

    router = spectator.inject(Router);
    permissionController = spectator.inject(PermissionController);
    modalController = spectator.inject(ModalController);
    jest.spyOn(modalController, 'present');
  });

  describe('ngOnInit', () => {
    it('should create', async () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should open registerModal when roles are not set', async () => {
      expect(modalController.present).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/user/search');
    });
  });
});
