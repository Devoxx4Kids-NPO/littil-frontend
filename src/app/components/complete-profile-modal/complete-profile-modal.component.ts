import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { firstValueFrom, Observable, Subscription, switchMap } from 'rxjs';
import {
  ApiV1GuestTeachersGet200Response,
  ApiV1SchoolsGet200Response,
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
  close!: () => boolean;
  public loading = false;
  public isSchool = false;
  public savingProfile = false;
  private roleValueSubscription!: Subscription;
  FormUtil = FormUtil;

  completeProfileForm: FormGroup = new FormGroup({
    role: new FormControl(Roles.GuestTeacher, Validators.required),
    schoolName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    prefix: new FormControl(''),
    surname: new FormControl('', Validators.required),
    addressStreet: new FormControl('', Validators.required),
    addressHousenumber: new FormControl('', Validators.required),
    postalCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{4}[A-Za-z]{2}$'),
    ])
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
    private schoolService: LittilSchoolService,
    private readonly authService: AuthService
  ) {
    this.completeProfileForm.markAsPristine();
    this.completeProfileForm.markAsUntouched();
  }

  public ngOnInit(): void {
    this.roleValueSubscription = this.completeProfileForm.controls[
      'role'
    ].valueChanges.subscribe((changes: any) => {
      this.isSchool = changes === Roles.School;
      if (changes === Roles.School) {
        this.completeProfileForm.controls['schoolName'].enable();
      } else {
        this.completeProfileForm.controls['schoolName'].disable();
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.roleValueSubscription) {
      this.roleValueSubscription.unsubscribe();
    }
  }

  public async onClickSaveProfile(): Promise<boolean> {
    return Promise.resolve().then(() => {
      FormUtil.ValidateAll(this.completeProfileForm);
      if (this.completeProfileForm.invalid) {
        return false;
      }
      this.savingProfile=true;

      let createOrUpdateCall: Observable<
        ApiV1GuestTeachersGet200Response | ApiV1SchoolsGet200Response
      >;
      const formValues = {
        name: this.completeProfileForm.controls['schoolName'].value,
        firstName: this.completeProfileForm.controls['firstName'].value,
        prefix: this.completeProfileForm.controls['prefix'].value,
        surname: this.completeProfileForm.controls['surname'].value,
        address:
          this.completeProfileForm.controls['addressStreet'].value +
          ' ' +
          this.completeProfileForm.controls['addressHousenumber'].value,
        postalCode:
          this.completeProfileForm.controls['postalCode'].value.toUpperCase(),
      };
      if (
        this.completeProfileForm.controls['role'].value === Roles.GuestTeacher
      ) {
        delete formValues.name;
        createOrUpdateCall = this.guestTeacherService.createOrUpdate(
          formValues as GuestTeacherPostResource
        );
      } else {
        createOrUpdateCall = this.schoolService.createOrUpdate(
          formValues as SchoolPostResource
        );
      }
      return firstValueFrom(createOrUpdateCall)
        .then(() => {
          return firstValueFrom(
            this.authService
              .getAccessTokenSilently({ ignoreCache: true })
              .pipe(switchMap(() => this.authService.user$))
          ).then(() => {
            return this.close();
          });
        })
        .catch((error: any) => {
          console.error('createOrUpdate profile error');
          this.savingProfile=false;
          return false;
        });
    });
  }

  public logOut(): void {
    this.authService.logout();
  }
}
