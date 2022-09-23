import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';
import { ButtonComponent } from '../button/button.component';
import { FormErrorMessageComponent } from '../forms/form-error-message/form-error-message.component';
import { FormInputPasswordComponent } from '../forms/password-input/form-input-password.component';
import { FormInputTextComponent } from '../forms/text-input/form-input-text.component';
import { LoginModalComponent } from './login-modal.component';

describe('LoginModalComponent', () => {
  let spectator: Spectator<LoginModalComponent>;
  let closeSpy: jest.SpyInstance;

  const createComponent = createComponentFactory({
    component: LoginModalComponent,
    declarations: [
      MockComponent(FormInputTextComponent),
      MockComponent(FormInputPasswordComponent),
      MockComponent(FormErrorMessageComponent),
      MockComponent(ButtonComponent),
    ],
    mocks: [],
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    });
    spectator = createComponent();
    spectator.detectChanges();
    spectator.component.close = () => undefined;
    closeSpy = jest.spyOn(spectator.component, 'close');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('onClickLogin', () => {
    it('should not close modal when form is invalid', async () => {
      await spectator.component.onClickLogin();
      expect(spectator.component.loginForm.invalid).toBe(true);
      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should close modal when form is valid', async () => {
      spectator.component.loginForm.get('email')?.setValue('email@email.com');
      spectator.component.loginForm.get('password')?.setValue('123');
      await spectator.component.onClickLogin();
      expect(spectator.component.loginForm.invalid).toBe(false);
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onClickCancel', () => {
    it('should close modal when clicked on cancel', () => {
      spectator.component.onClickCancel();
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Template', () => {
    it('should show login form', () => {
      expect(spectator.query('[data-test="form-login"]')).toBeDefined();
    });
  });
});
