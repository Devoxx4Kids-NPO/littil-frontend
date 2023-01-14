import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import {
  GuestTeacherPostResource,
  SchoolPostResource,
} from '../../api/generated';
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
  implements IModalComponent<undefined, undefined>, OnInit, OnDestroy
{
  close!: () => undefined;
  public loading = false;
  public isSchool = false;
  private roleSubscription!: Subscription;
  FormUtil = FormUtil;

  completeProfileForm: FormGroup = new FormGroup({
    role: new FormControl(Roles.GuestTeacher, Validators.required),
    schoolName: new FormControl('', Validators.required),
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
      id: Roles.GuestTeacher,
      description: 'Ik ben een gastdocent',
      checked: true,
    },
    {
      id: Roles.School,
      description: 'Ik representeer een school',
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

  public ngOnInit(): void {
    this.completeProfileForm.controls['role'].valueChanges.subscribe(
      (changes: any) => {
        this.isSchool = changes === Roles.School;
        if (changes === Roles.School) {
          this.completeProfileForm.controls['schoolName'].enable();
        } else {
          this.completeProfileForm.controls['schoolName'].disable();
        }
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }

  public onClickSaveProfile(): Promise<boolean> {
    return Promise.resolve().then(() => {
      FormUtil.ValidateAll(this.completeProfileForm);
      if (this.completeProfileForm.invalid) {
        return false;
      }

      let createOrUpdateCall: Observable<
        GuestTeacherPostResource | SchoolPostResource
      >;
      if (
        this.completeProfileForm.controls['role'].value === Roles.GuestTeacher
      ) {
        const formValuesGuestTeacher: GuestTeacherPostResource = {
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
        createOrUpdateCall = this.guestTeacherService.createOrUpdate(
          formValuesGuestTeacher
        );
      } else {
        const formValuesSchool: SchoolPostResource = {
          name: this.completeProfileForm.controls['schoolName'].value,
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
        createOrUpdateCall =
          this.schoolService.createOrUpdate(formValuesSchool);
      }

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
