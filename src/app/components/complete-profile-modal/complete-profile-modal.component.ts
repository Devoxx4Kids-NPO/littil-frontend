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
import { RadioInput } from '../forms/radio-input/form-input-radio.component';
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
    role: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    prefix: new FormControl(''),
    surname: new FormControl('', Validators.required),
    addressStreet: new FormControl('', Validators.required),
    addressHousenumber: new FormControl('', Validators.required),
    postalCodeNumbers: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{4}$'),
    ]),
    postalCodeLetters: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z]{2}$'),
    ]),
  });

  roleChoices: RadioInput[] = [
    {
      id: Roles.School,
      description: 'Ik representeer een school',
      checked: false,
    },
    {
      id: Roles.GuestTeacher,
      description: 'Ik ben een gastdocent',
      checked: false,
    },
  ];

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

      // TODO: check if houseNumber needs to be separated from street, because postalCode + housenumber equals an address and location
      const formValues = {
        firstName: this.completeProfileForm.controls['firstName'].value,
        prefix: this.completeProfileForm.controls['prefix'].value,
        surname: this.completeProfileForm.controls['surname'].value,
        address:
          this.completeProfileForm.controls['addressStreet'].value +
          ' ' +
          this.completeProfileForm.controls['addressHousenumber'].value,
        postalCode:
          this.completeProfileForm.controls['postalCodeNumbers'].value +
          this.completeProfileForm.controls['postalCodeLetters'].value,
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