import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { LittilUserService } from '../../services/littil-user/littil-user.service';
import { FormUtil } from '../../utils/form.util';
import { IRegisterModalOutput, RegisterModalComponent } from './register-modal.component';

describe('RegisterModalComponent', () => {
  let spectator: Spectator<RegisterModalComponent>;
  let component: RegisterModalComponent;

  let registerSpy: jest.SpyInstance;
  let cancelSpy: jest.SpyInstance;
  let loginSpy: jest.SpyInstance;
  let closeSpy: jest.SpyInstance;
  let formUtilSpy: jest.SpyInstance;

  const createComponent = createComponentFactory({
    component: RegisterModalComponent,
    declareComponent: false,
    imports: [NoopAnimationsModule],
    providers: [
      MockProvider(LittilUserService, {
        create: () =>
          of({
            emailAddress: 'email@email.com',
          }),
      }),
    ],
    mocks: [],
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    });
    spectator = createComponent();
    spectator.detectChanges();
    component = spectator.component;
    component.close = (response: IRegisterModalOutput) => {
      return { triggerLogin: false };
    };
    registerSpy = jest.spyOn(component, 'onClickRegister');
    cancelSpy = jest.spyOn(component, 'closeModal');
    loginSpy = jest.spyOn(component, 'onClickLogin');
    closeSpy = jest.spyOn(component, 'close');
    formUtilSpy = jest.spyOn(FormUtil, 'ValidateAll');
  });

  afterEach(() => {
    component.close({ triggerLogin: false });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickRegister', () => {
    it('should call register function when clicked on register button', async () => {
      const registerBtn = spectator.query('[data-test="registerButton"]') as HTMLElement;
      if (registerBtn) {
        registerBtn.click();
      }
      expect(registerSpy).toHaveBeenCalledTimes(1);
    });

    it('should close modal without loginTrigger when modal is closed with cancel button', async () => {
      component.registerForm.get('email')?.setValue('email@email.com');
      component.registerForm.get('password')?.setValue('123');
      const cancelBtn = spectator.query('[data-test="cancelButton"]') as HTMLElement;
      if (cancelBtn) {
        cancelBtn.click();
      }
      expect(cancelSpy).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledWith({ triggerLogin: false });
    });

    it('should not show confirmation or close modal when form is invalid', async () => {
      await component.onClickRegister();
      expect(registerSpy).toHaveBeenCalledTimes(1);
      expect(component.registerForm.invalid).toBe(true);
      expect(component.hideForm).toBe(false);
      expect(component.hideConfirmation).toBe(true);
      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should show confirmation when form is valid', async () => {
      component.registerForm.get('email')?.setValue('email@email.com');
      component.registerForm.get('password')?.setValue('123');
      await component.onClickRegister();
      expect(component.registerForm.invalid).toBe(false);
      expect(component.hideForm).toBe(true);
      expect(component.hideConfirmation).toBe(false);
      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should close modal with loginTrigger when confirmation is closed with login button', async () => {
      component.registerForm.get('email')?.setValue('email@email.com');
      component.registerForm.get('password')?.setValue('123');
      await component.onClickRegister();
      spectator.detectChanges();
      expect(component.registerForm.invalid).toBe(false);
      expect(component.hideForm).toBe(true);
      expect(component.hideConfirmation).toBe(false);
      const loginBtn = spectator.query('[data-test="loginButton"]') as HTMLElement;
      console.log('loginBtn');
      if (loginBtn) {
        loginBtn.click();
      }
      expect(loginSpy).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledWith({ triggerLogin: true });
    });

    it('should close modal without loginTrigger when confirmation is closed with close button', async () => {
      component.registerForm.get('email')?.setValue('email@email.com');
      component.registerForm.get('password')?.setValue('123');
      await component.onClickRegister();
      spectator.detectChanges();
      expect(component.registerForm.invalid).toBe(false);
      expect(component.hideForm).toBe(true);
      expect(component.hideConfirmation).toBe(false);
      const cancelBtn = spectator.query('[data-test="closeButton"]') as HTMLElement;
      if (cancelBtn) {
        cancelBtn.click();
      }
      expect(cancelSpy).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledWith({ triggerLogin: false });
    });
  });

  describe('closeModal', () => {
    it('should close modal when clicked on cancel', async () => {
      component.closeModal();
      expect(closeSpy).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledWith({ triggerLogin: false });
    });
  });

  describe('onClickLogin', () => {
    it('should close modal when clicked on cancel', async () => {
      component.onClickLogin();
      expect(closeSpy).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledWith({ triggerLogin: true });
    });
  });

  describe('Template', () => {
    it('should show register form', () => {
      expect(spectator.query('[data-test="form-register"]')).toBeDefined();
    });
  });
});
