import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IModalComponent } from '../modal/modal.controller';
import { FormUtil } from '../../utils/form.util';

@Component({
  selector: 'littil-login-modal',
  templateUrl: 'login-modal.component.html',
  animations: [
    trigger('hideShow', [
      state(
        'hidden',
        style({
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      transition('hidden => visible', [animate('200ms')]),
    ]),
  ],
})
export class LoginModalComponent
  implements IModalComponent<undefined, undefined>
{
  close!: () => undefined;
  public loading = false;
  FormUtil = FormUtil;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor() {}

  public onClickLogin(): Promise<any> {
    return Promise.resolve().then(() => {
      FormUtil.ValidateAll(this.loginForm);
      if (this.loginForm.invalid) {
        return false;
      }
      // TODO: login
      return this.close();
    });
  }

  public onClickCancel() {
    this.close();
  }
}
