import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { LittilSchoolService } from '../../services/littil-school/littil-school.service';
import { LittilTeacherService } from '../../services/littil-teacher/littil-teacher.service';
import { Roles } from '../../services/permission.controller';
import { FormUtil } from '../../utils/form.util';
import { CompleteProfileModalComponent } from './complete-profile-modal.component';

describe('CompleteProfileModalComponent', () => {
  let spectator: Spectator<CompleteProfileModalComponent>;
  let formUtilSpy: jest.SpyInstance;
  let closeSpy: jest.SpyInstance;
  const mockDialogRef = {
    afterClosed: () => of(true),
    close: jest.fn(),
  } as unknown as MatDialogRef<any>;

  const createComponent = createComponentFactory({
    component: CompleteProfileModalComponent,
    declareComponent: false,
    imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    providers: [
      MockProvider(AuthService, {
        getAccessTokenSilently: jest.fn().mockReturnValue(of('test-access-token')),
        user$: of({
          'https://littil.org/authorizations': ['test-role']
        })
      }),
      MockProvider(LittilSchoolService, {
        createOrUpdate: () => of({ 
          id: 'test-id',
          name: 'Test School',
          address: 'Test Address',
          postalCode: '1234AA',
          firstName: 'Test',
          prefix: '',
          surname: 'School'
        }),
      }),
      MockProvider(LittilTeacherService, {
        createOrUpdate: () => of({ 
          id: 'test-id',
          firstName: 'Test',
          prefix: '',
          surname: 'User',
          address: 'Test Address',
          postalCode: '1234AA'
        }),
      }),
      { provide: MatDialogRef, useValue: mockDialogRef },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    closeSpy = jest.spyOn(mockDialogRef, 'close');
    spectator.detectChanges();
    formUtilSpy = jest.spyOn(FormUtil, 'ValidateAll');
  });


  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('onClickSaveProfile', () => {
    it('should not close modal when form is invalid', async () => {
      await spectator.component.onClickSaveProfile();
      expect(spectator.component.completeProfileForm.invalid).toBe(true);
      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should close modal when form is valid', async () => {
      spectator.component.completeProfileForm.get('role')?.setValue(Roles.GuestTeacher);
      spectator.component.completeProfileForm.get('firstName')?.setValue('Firstname');
      spectator.component.completeProfileForm.get('surname')?.setValue('Surname');
      spectator.component.completeProfileForm.get('address')?.setValue('Street 123');
      spectator.component.completeProfileForm.get('postalCode')?.setValue('1234AA');
      await spectator.component.onClickSaveProfile();
      expect(spectator.component.completeProfileForm.invalid).toBe(false);
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Template', () => {
    it('should show completeProfile form', () => {
      expect(spectator.query('[data-test="form-complete-profile"]')).toBeDefined();
    });
  });
});
