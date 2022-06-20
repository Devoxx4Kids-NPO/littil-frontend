import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ILoginModalInput,
  LoginModalComponent,
  LoginType,
} from './login-modal.component';
import { MockComponent } from 'ng-mocks';
import { FormInputTextComponent } from '../../components/forms/text-input/form-input-text.component';
import { FormInputPasswordComponent } from '../../components/forms/password-input/form-input-password.component';
import { FormInputRadioComponent } from '../../components/forms/radio-input/form-input-radio.component';
import { ButtonComponent } from '../../components/button/button.component';
import {TestBed} from "@angular/core/testing";
import {FormControl, Validators} from "@angular/forms";

describe('LoginModalComponent', () => {
  let spectator: Spectator<LoginModalComponent>;
  let closeSpy: jest.SpyInstance;
  let loginSpy: jest.SpyInstance;
  let registerTeacherSpy: jest.SpyInstance;
  let registerSchoolSpy: jest.SpyInstance;

  const createComponent = createComponentFactory({
    component: LoginModalComponent,
    declarations: [
      MockComponent(FormInputTextComponent),
      MockComponent(FormInputPasswordComponent),
      MockComponent(FormInputRadioComponent),
      MockComponent(ButtonComponent),
    ],
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    spectator = createComponent();
    spectator.detectChanges();
    spectator.component.close = () => undefined;
    closeSpy = jest.spyOn(spectator.component, 'close');
    loginSpy = jest.spyOn(spectator.component, 'login');
    registerTeacherSpy = jest.spyOn(spectator.component, 'registerTeacher');
    registerSchoolSpy = jest.spyOn(spectator.component, 'registerSchool');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('onOpen', () => {
    it('should set type from data [Login]', () => {
      spectator.component.onOpen({ type: LoginType.Login });
      expect(spectator.component.type).toEqual(LoginType.Login);
    });
    it('should set type from data [Register]', () => {
      spectator.component.onOpen({ type: LoginType.Register });
      expect(spectator.component.type).toEqual(LoginType.Register);
    });
    it('should disable forms when data is undefined', () => {
      spectator.component.onOpen({} as ILoginModalInput);
      expect(spectator.component.loginForm.disabled).toBe(true);
      expect(spectator.component.registerSchoolForm.disabled).toBe(true);
      expect(spectator.component.registerTeacherForm.disabled).toBe(true);
      expect(spectator.component.type).toBeUndefined();
    });
  });

  describe('onRegisterTypeChanged', () => {
    it('should set registerType when changed', () => {
      spectator.component.onOpen({ type: LoginType.Login });
      expect(spectator.component.registerType).toEqual('teacher');
      spectator.component.onRegisterTypeChanged('school');
      expect(spectator.component.registerType).toEqual('school');
    });
  });

  describe('onClickOK', () => {
    it('should call onClickLogin() when type [Login]', () => {
      spectator.component.onOpen({ type: LoginType.Login });
      spectator.component.onClickOK();
      expect(loginSpy).toHaveBeenCalledTimes(1);
      expect(registerTeacherSpy).toHaveBeenCalledTimes(0);
      expect(registerSchoolSpy).toHaveBeenCalledTimes(0);
    });

    it('should call onClickRegisterTeacher() when type [Register] & registerType [teacher]', () => {
      spectator.component.onOpen({ type: LoginType.Register });
      spectator.component.registerType = 'teacher';
      spectator.component.onClickOK();
      expect(loginSpy).toHaveBeenCalledTimes(0);
      expect(registerTeacherSpy).toHaveBeenCalledTimes(1);
      expect(registerSchoolSpy).toHaveBeenCalledTimes(0);
    });

    it('should call onClickRegisterSchoolSpy() when type [Register] & registerType [school]', () => {
      spectator.component.onOpen({ type: LoginType.Register });
      spectator.component.registerType = 'school';
      spectator.component.onClickOK();
      expect(loginSpy).toHaveBeenCalledTimes(0);
      expect(registerTeacherSpy).toHaveBeenCalledTimes(0);
      expect(registerSchoolSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('login', () => {
    it('should not close modal when form is invalid', async () => {
      spectator.component.onOpen({ type: LoginType.Login });
      await spectator.component.login();
      expect(spectator.component.loginForm.invalid).toBe(true);
      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should close modal when form is valid', async () => {
      spectator.component.onOpen({ type: LoginType.Login });
      spectator.component.loginForm.get('email')?.setValue('email@email.com');
      spectator.component.loginForm.get('password')?.setValue('123');
      await spectator.component.login();
      expect(spectator.component.loginForm.invalid).toBe(false);
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('registerTeacher', () => {
    it('should not close modal when form is invalid', async () => {
      spectator.component.onOpen({ type: LoginType.Register });
      await spectator.component.registerTeacher();
      expect(spectator.component.registerTeacherForm.invalid).toBe(true);
      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should not close modal when form has Invalid postalCode', async () => {
      spectator.component.onOpen({ type: LoginType.Register });
      spectator.component.registerTeacherForm.get('postalCode')?.setValue('12-INVALID');
      await spectator.component.registerTeacher();
      expect(spectator.component.registerTeacherForm.invalid).toBe(true);
      expect(closeSpy).not.toHaveBeenCalled();
    });
  });

  describe('registerSchool', () => {
    it('should not close modal when form is invalid', async () => {
      spectator.component.onOpen({ type: LoginType.Login });
      await spectator.component.registerSchool();
      expect(spectator.component.registerSchoolForm.invalid).toBe(true);
      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should close modal when form is valid', async () => {
      spectator.component.onOpen({ type: LoginType.Login });
      spectator.component.registerSchoolForm
        .get('schoolName')
        ?.setValue('Schoolname');
      await spectator.component.registerSchool();
      expect(spectator.component.registerSchoolForm.invalid).toBe(false);
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onClickCancel', () => {
    it('should close modal when clicked on cancel', () => {
      spectator.component.onOpen({ type: LoginType.Login });
      spectator.component.onClickCancel();
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Template', () => {
    it('should show login form when type [Login]', () => {
      spectator.component.onOpen({ type: LoginType.Login });
      expect(spectator.query('[data-test="form-login"]')).toBeDefined();
      expect(spectator.query('[data-test="form-register-teacher"]')).toBeNull();
      expect(spectator.query('[data-test="form-register-school"]')).toBeNull();
    });
    it('should show registerTeacher form when type [Register] and registerType [teacher]', () => {
      spectator.component.onOpen({ type: LoginType.Register });
      spectator.component.registerType = 'teacher';
      expect(spectator.query('[data-test="form-login"]')).toBeNull();
      expect(
        spectator.query('[data-test="form-register-teacher"]')
      ).toBeDefined();
      expect(spectator.query('[data-test="form-register-school"]')).toBeNull();
    });
    it('should show registerSchool form when type [Register] and registerType [school]', () => {
      spectator.component.onOpen({ type: LoginType.Register });
      spectator.component.registerType = 'school';
      expect(spectator.query('[data-test="form-login"]')).toBeNull();
      expect(spectator.query('[data-test="form-register-teacher"]')).toBeNull();
      expect(
        spectator.query('[data-test="form-register-school"]')
      ).toBeDefined();
    });
  });
});
