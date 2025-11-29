import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ChangeEmailComponent } from './change-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LittilUserService } from '../../../services/littil-user/littil-user.service';
import { PermissionController } from '../../../services/permission.controller';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';


describe('ChangeEmailComponent (decoupled)', () => {
  let fixture: ComponentFixture<ChangeEmailComponent>;
  let component: ChangeEmailComponent;

  const littilUserServiceMock = {
    emailVerificationCode: jest.fn(),
    changeEmail: jest.fn(),
  };

  const permissionControllerMock = {
    userId: 'user-123',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Standalone component: include in imports
      imports: [ChangeEmailComponent, ReactiveFormsModule],
      providers: [
        { provide: LittilUserService, useValue: littilUserServiceMock },
        { provide: PermissionController, useValue: permissionControllerMock },
      ],
    })
      // We override the template to decouple unit tests from DOM & child components
      .overrideComponent(ChangeEmailComponent, {
        set: { template: '' },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ChangeEmailComponent);
    component = fixture.componentInstance;


    // Clear previous mocks per test
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state', () => {
    it('flags should be set correctly', () => {
      expect(component['hideForm']).toBe(false);
      expect(component['hideConfirmation']).toBe(true);
      expect(component['hideCancelConfirmation']).toBe(true);
      expect(component['emailConfirmed']).toBe(false);
    });

    it('form should be defined with email & verificationCode controls', () => {
      expect(component.changeEmailForm.contains('email')).toBe(true);
      expect(component.changeEmailForm.contains('verificationCode')).toBe(true);
    });

    it('validEmail() should be false initially', () => {
      expect(component.validEmail()).toBe(false);
    });
  });

  describe('validEmail()', () => {
    it('should be false for invalid email & true for a valid one', () => {
      const emailCtrl = component.changeEmailForm.get('email')!;
      emailCtrl.setValue('not-an-email');
      expect(component.validEmail()).toBe(false);

      emailCtrl.setValue('info@example.com');
      expect(component.validEmail()).toBe(true);
    });
  });

  describe('onClickConfirmNewEmail()', () => {
    it('should call service with userId & resource and set isVerificationCodeSend=true on 2xx', () => {
      const email = 'info@example.com';
      component.changeEmailForm.get('email')!.setValue(email);

      littilUserServiceMock.emailVerificationCode.mockReturnValue(
        of(new HttpResponse({ status: 200 }))
      );

      component.onClickConfirmNewEmail();

      expect(littilUserServiceMock.emailVerificationCode).toHaveBeenCalledTimes(1);
      expect(littilUserServiceMock.emailVerificationCode).toHaveBeenCalledWith(
        'user-123',
        { emailAddress: email }
      );
      expect(component['emailConfirmed']).toBe(true);
    });

    it('should not set emailConfirmed on non-2xx', () => {
      const email = 'info@example.com';
      component.changeEmailForm.get('email')!.setValue(email);

      littilUserServiceMock.emailVerificationCode.mockReturnValue(
        of(new HttpResponse({ status: 400 }))
      );

      component['emailConfirmed'] = false;
      component.onClickConfirmNewEmail();

      expect(littilUserServiceMock.emailVerificationCode).toHaveBeenCalledTimes(1);
      expect(component['emailConfirmed']).toBe(false);
    });

    it('should handle null response gracefully', () => {
      const email = 'info@example.com';
      component.changeEmailForm.get('email')!.setValue(email);

      littilUserServiceMock.emailVerificationCode.mockReturnValue(of(null));

      component['emailConfirmed'] = false;
      component.onClickConfirmNewEmail();

      expect(littilUserServiceMock.emailVerificationCode).toHaveBeenCalledTimes(1);
      expect(component['emailConfirmed']).toBe(false);
    });
  });

  describe('onClickChangeEmail()', () => {
    it('should call service with correct payload and toggle flags on 2xx', () => {
      const email = 'info@example.com';
      const code = '123456';

      component.changeEmailForm.get('email')!.setValue(email);
      component.changeEmailForm.get('verificationCode')!.setValue(code);

      littilUserServiceMock.changeEmail.mockReturnValue(
        of(new HttpResponse({ status: 200 }))
      );

      component.onClickChangeEmail();

      expect(littilUserServiceMock.changeEmail).toHaveBeenCalledTimes(1);
      expect(littilUserServiceMock.changeEmail).toHaveBeenCalledWith(
        'user-123',
        { newEmailAddress: email, verificationCode: code }
      );

      expect(component['hideForm']).toBe(true);
      expect(component['hideConfirmation']).toBe(false);
    });

    it('should not toggle flags on non-2xx', () => {
      const email = 'info@example.com';
      const code = '123456';

      component.changeEmailForm.get('email')!.setValue(email);
      component.changeEmailForm.get('verificationCode')!.setValue(code);

      littilUserServiceMock.changeEmail.mockReturnValue(
        of(new HttpResponse({ status: 400 }))
      );

      // Pre-state
      component['hideForm'] = false;
      component['hideConfirmation'] = true;

      component.onClickChangeEmail();

      expect(littilUserServiceMock.changeEmail).toHaveBeenCalledTimes(1);
      expect(component['hideForm']).toBe(false);
      expect(component['hideConfirmation']).toBe(true);
    });

    it('should handle null response gracefully', () => {
      const email = 'info@example.com';
      const code = '123456';

      component.changeEmailForm.get('email')!.setValue(email);
      component.changeEmailForm.get('verificationCode')!.setValue(code);

      littilUserServiceMock.changeEmail.mockReturnValue(of(null));

      component['hideForm'] = false;
      component['hideConfirmation'] = true;

      component.onClickChangeEmail();

      expect(littilUserServiceMock.changeEmail).toHaveBeenCalledTimes(1);
      expect(component['hideForm']).toBe(false);
      expect(component['hideConfirmation']).toBe(true);
    });
  });

  describe('onClickCancel()', () => {
    it('should reset flags and form to pristine/untouched with empty values', () => {
      const emailCtrl = component.changeEmailForm.get('email')!;
      const codeCtrl = component.changeEmailForm.get('verificationCode')!;

      // Set pre-state
      component['hideForm'] = true;
      component['hideConfirmation'] = false;
      component['hideCancelConfirmation'] = true;
      component['emailConfirmed'] = true;

      emailCtrl.setValue('info@example.com');
      codeCtrl.setValue('999999');

      // Simulate interaction
      emailCtrl.markAsDirty();
      emailCtrl.markAsTouched();
      codeCtrl.markAsDirty();
      codeCtrl.markAsTouched();

      // Call protected method (via any to bypass TS access modifier)
      (component as any).onClickCancel();

      // Flags reset
      expect(component['hideForm']).toBe(true);
      expect(component['hideConfirmation']).toBe(true);
      expect(component['hideCancelConfirmation']).toBe(false);
      expect(component['emailConfirmed']).toBe(false);
    });
  });
});
