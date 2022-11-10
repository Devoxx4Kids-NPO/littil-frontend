import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { GuestTeacherPostResource, School } from '../../api/generated';
import { LittilSchoolService } from '../../services/littil-school/littil-school.service';
import { LittilTeacherService } from '../../services/littil-teacher/littil-teacher.service';
import { Roles } from '../../services/permission.controller';
import { FormUtil } from '../../utils/form.util';
import { IModalComponent } from '../modal/modal.controller';

@Component({
  selector: 'littil-complete-profile-modal',
  templateUrl: 'complete-profile-modal.component.html',
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
export class CompleteProfileModalComponent
  implements IModalComponent<undefined, undefined>, OnInit
{
  close!: () => undefined;
  public loading = false;
  FormUtil = FormUtil;
  completeProfileForm: FormGroup = new FormGroup({
    role: new FormControl(Roles.GuestTeacher, Validators.required),
    firstName: new FormControl('', Validators.required),
    prefix: new FormControl(''),
    surname: new FormControl('', Validators.required),
    addressStreet: new FormControl('Straat', Validators.required), // TODO: remove when adress component is made
    addressHousenumber: new FormControl('123', Validators.required), // TODO: remove when adress component is made
    address: new FormControl('Straat 123'), // TODO: remove when adress component is made
    postalCodeNumbers: new FormControl('1234', Validators.required), // TODO: remove when adress component is made
    postalCodeLetters: new FormControl('AA', Validators.required), // TODO: remove when adress component is made
    postalCode: new FormControl('1234AA'), // TODO: remove when adress component is made
  });

  constructor(
    private guestTeacherService: LittilTeacherService,
    private schoolService: LittilSchoolService
  ) {
    this.completeProfileForm.markAsPristine();
    this.completeProfileForm.markAsUntouched();
  }

  ngOnInit(): void {}

  public onClickSaveProfile(): Promise<boolean> {
    return Promise.resolve().then(() => {
      FormUtil.ValidateAll(this.completeProfileForm);
      if (this.completeProfileForm.invalid) {
        return false;
      }

      const formValues = {
        firstName: this.completeProfileForm.controls['firstName'].value,
        prefix: this.completeProfileForm.controls['prefix'].value,
        surname: this.completeProfileForm.controls['surname'].value,
        address: this.completeProfileForm.controls['address'].value,
        postalCode: this.completeProfileForm.controls['postalCode'].value,
      };

      const createOrUpdateCall =
        this.completeProfileForm.controls['role'].value === Roles.GuestTeacher
          ? this.guestTeacherService.createOrUpdate(
              formValues as GuestTeacherPostResource
            )
          : this.schoolService.createOrUpdate(formValues as School);

      return firstValueFrom(createOrUpdateCall)
        .then(() => {
          this.close();
          return true;
        })
        .catch((error: any) => {
          console.error('createOrUpdate profile error', error);
          return false;
        });
    });
  }
}
