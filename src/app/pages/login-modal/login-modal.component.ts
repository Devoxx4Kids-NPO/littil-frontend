import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RadioInput } from '../../components/forms/radio-input/form-input-radio.component';
import { FormUtil } from '../../utils/form.util';
import { IModalComponent } from '../../components/modal/modal.controller';

@Component({
  selector: 'littil-login-modal',
  templateUrl: 'login-modal.component.html',
})
export class LoginModalComponent
  implements IModalComponent<undefined, ILoginModalInput>
{
  close!: () => undefined;
  public loading = false;
  public type!: LoginType;

  LoginType = LoginType;
  FormUtil = FormUtil;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  registerTeacherForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  registerSchoolForm: FormGroup = new FormGroup({
    schoolName: new FormControl('', Validators.required),
  });

  public registerType: 'teacher' | 'school' = 'teacher';
  public radioInputs: RadioInput[] = [
    {
      id: 'teacher',
      description: 'Registreren als docent',
      checked: true,
    },
    {
      id: 'school',
      description: 'Registreren als school',
      checked: false,
    },
  ];

  constructor() {}

  public onOpen(data: ILoginModalInput): void {
    if (!data || !data.type) {
      this.loginForm.disable();
      this.registerSchoolForm.disable();
      this.registerTeacherForm.disable();
      // TODO: show error
    }
    this.type = data.type;
  }

  public onRegisterTypeChanged($event: any) {
    this.registerType = $event;
  }

  public onClickOK(): Promise<any> {
    if (this.type === LoginType.Login) {
      return this.login();
    } else {
      if (this.registerType === 'teacher') {
        return this.registerTeacher();
      } else {
        return this.registerSchool();
      }
    }
  }

  public async login(): Promise<any> {
    return Promise.resolve().then(() => {
      FormUtil.ValidateAll(this.loginForm);
      if (this.loginForm.invalid) {
        return false;
      }
      // TODO: login
      return this.close();
    });
  }

  public async registerTeacher(): Promise<any> {
    return Promise.resolve().then(() => {
      FormUtil.ValidateAll(this.registerTeacherForm);
      if (this.registerTeacherForm.invalid) {
        return false;
      }
      // TODO: Register teacher
      return this.close();
    });
  }

  public async registerSchool(): Promise<any> {
    return Promise.resolve().then(() => {
      FormUtil.ValidateAll(this.registerSchoolForm);
      if (this.registerSchoolForm.invalid) {
        return false;
      }
      // TODO: Register school
      return this.close();
    });
  }

  public onClickCancel() {
    this.close();
  }
}

export interface ILoginModalInput {
  type: LoginType;
}

export enum LoginType {
  Login = 'login',
  Register = 'register',
}
