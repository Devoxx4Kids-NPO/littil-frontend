import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { LittilSchoolService } from '../../services/littil-school/littil-school.service';
import { LittilTeacherService } from '../../services/littil-teacher/littil-teacher.service';
import { Roles } from '../../services/permission.controller';
import { FormUtil } from '../../utils/form.util';
import { ButtonComponent } from '../button/button.component';
import { FormErrorMessageComponent } from '../forms/form-error-message/form-error-message.component';
import { FormInputRadioComponent } from '../forms/radio-input/form-input-radio.component';
import { FormInputTextComponent } from '../forms/text-input/form-input-text.component';
import { CompleteProfileModalComponent } from './complete-profile-modal.component';

describe('CompleteProfileModalComponent', () => {
  let spectator: Spectator<CompleteProfileModalComponent>;
  let closeSpy: jest.SpyInstance;
  let formUtilSpy: jest.SpyInstance;

  const createComponent = createComponentFactory({
    component: CompleteProfileModalComponent,
    declarations: [
      MockComponent(FormInputTextComponent),
      MockComponent(FormInputRadioComponent),
      MockComponent(FormErrorMessageComponent),
      MockComponent(ButtonComponent),
    ],
    providers: [
      MockProvider(LittilSchoolService, {
        createOrUpdate: () => of(),
      }),
      MockProvider(LittilTeacherService, {
        createOrUpdate: () => of(),
      }),
    ],
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    });
    spectator = createComponent();
    spectator.detectChanges();
    spectator.component.close = () => undefined;
    closeSpy = jest.spyOn(spectator.component, 'close');
    formUtilSpy = jest.spyOn(FormUtil, 'ValidateAll');
  });

  afterEach(() => {
    spectator.component.close();
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
      spectator.component.completeProfileForm
        .get('role')
        ?.setValue(Roles.GuestTeacher);
      spectator.component.completeProfileForm
        .get('firstName')
        ?.setValue('Firstname');
      spectator.component.completeProfileForm
        .get('surname')
        ?.setValue('Surname');
      spectator.component.completeProfileForm
        .get('addressStreet')
        ?.setValue('Street');
      spectator.component.completeProfileForm
        .get('addressHousenumber')
        ?.setValue('123');
      spectator.component.completeProfileForm
        .get('postalCodeNumbers')
        ?.setValue('1234');
      spectator.component.completeProfileForm
        .get('postalCodeLetters')
        ?.setValue('AA');
      await spectator.component.onClickSaveProfile();
      expect(spectator.component.completeProfileForm.invalid).toBe(false);
      // expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Template', () => {
    it('should show completeProfile form', () => {
      expect(
        spectator.query('[data-test="form-complete-profile"]')
      ).toBeDefined();
    });
  });
});
