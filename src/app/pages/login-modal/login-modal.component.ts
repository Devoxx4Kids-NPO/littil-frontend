import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { RadioInput } from '../../components/forms/radio-input/form-input-radio.component';
import { IModalComponent } from '../../components/modal/modal.controller';
import { Teacher } from '../../model/teacher';
import { TeacherService } from '../../services/teacher/teacher.service';
import { FormUtil } from '../../utils/form.util';

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
    firstName: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    postalCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[1-9][0-9]{3}$'),
    ]),
    country: new FormControl('Nederland', Validators.required),
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

  constructor(private teacherService: TeacherService) {}

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
    this.registerTeacherForm.reset();
    this.registerSchoolForm.reset();
    this.loginForm.reset();
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
    FormUtil.ValidateAll(this.registerTeacherForm);
    if (this.registerTeacherForm.invalid) {
      return Promise.resolve(false);
    }
    const teacher: Teacher = {
      id: undefined,
      firstName: this.registerTeacherForm.controls['firstName'].value,
      surname: this.registerTeacherForm.controls['surname'].value,
      email: this.registerTeacherForm.controls['email'].value,
      postalCode: this.registerTeacherForm.controls['postalCode'].value,
      country: this.registerTeacherForm.controls['country'].value,
    };
    return firstValueFrom(this.teacherService.create(teacher))
      .then(() => {
        // TODO: output info for confirmation on homepage
        return this.close();
      })
      .catch((error) => {
        // TODO: error handling
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
