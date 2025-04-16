import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { MockProvider } from 'ng-mocks';
import { ModalController } from '../../components/modal/modal.controller';
import { PermissionController } from '../../services/permission.controller';
import { CompleteProfilePageComponent } from './complete-profile.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentRef } from '@angular/core';
import { of } from 'rxjs';
import { CompleteProfileModalComponent } from '../../components/complete-profile-modal/complete-profile-modal.component';

describe('CompleteProfilePageComponent', () => {
  let spectator: Spectator<CompleteProfilePageComponent>;
  let router: Router;
  let modalController: ModalController;
  let permissionController: PermissionController;
  let matDialog: MatDialog;
  let openSpy: jest.SpyInstance;

  const mockDialogRef = {
    afterClosed: () => of(true),
  } as unknown as MatDialogRef<any>;

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
      MockProvider(MatDialog, {
        open: jest.fn().mockReturnValue(mockDialogRef),
      }),
      HttpClient,
    ],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    openSpy = jest.spyOn(spectator.inject(MatDialog), 'open');

    router = spectator.inject(Router);
    permissionController = spectator.inject(PermissionController);
    matDialog = spectator.inject(MatDialog);
  });

  afterEach(() => {
    openSpy.mockClear();
  });

  describe('ngOnInit', () => {
    it('should create', async () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should open registerModal when roles are not set', async () => {
      await spectator.component.ngOnInit();
      
      expect(openSpy).toHaveBeenCalledTimes(1);
      expect(openSpy).toHaveBeenCalledWith(
        CompleteProfileModalComponent,
        expect.objectContaining({
          width: expect.any(String),
          disableClose: expect.any(Boolean)
        })
      );
      expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/user/search');
    });
  });
});
