import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService, User } from '@auth0/auth0-angular';
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
import { ButtonComponent } from '../button/button.component';
import { FormErrorMessageComponent } from '../forms/form-error-message/form-error-message.component';
import {
  FormInputRadioComponent,
  RadioInput,
} from '../forms/radio-input/form-input-radio.component';
import { FormInputTextComponent } from '../forms/text-input/form-input-text.component';
import { IModalComponent } from '../modal/modal.controller';
import { PermissionController } from '../../services/permission.controller';

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
  styles: [
    `
    .modal-content {
      display: block;
      visibility: visible;
      padding: 20px;
    }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    FormInputTextComponent,
    FormInputRadioComponent,
    FormErrorMessageComponent,
  ],
})
export class CompleteProfileModalComponent
  implements IModalComponent<undefined, undefined>, OnInit, OnDestroy
{
  close: () => boolean;
  public loading = false;
  public isSchool = false;
  public savingProfile = false;
  private roleValueSubscription: Subscription;
  FormUtil = FormUtil;

  completeProfileForm: FormGroup = new FormGroup({
    role: new FormControl(Roles.GuestTeacher, Validators.required),
    schoolName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    prefix: new FormControl(''),
    surname: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    postalCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{4}[A-Za-z]{2}$'),
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
    private readonly guestTeacherService: LittilTeacherService,
    private readonly schoolService: LittilSchoolService,
    private readonly authService: AuthService,
    private readonly permissionController: PermissionController,
    private dialogRef: MatDialogRef<CompleteProfileModalComponent>
  ) {}

  public ngOnInit(): void {
    this.roleValueSubscription = this.completeProfileForm.controls['role'].valueChanges.subscribe(
      changes => {
        this.isSchool = changes === Roles.School;
        if (this.isSchool) {
          this.completeProfileForm.controls['schoolName'].enable();
        } else {
          this.completeProfileForm.controls['schoolName'].disable();
        }
      }
    );
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
      this.savingProfile = true;

      let createOrUpdateCall: Observable<
        ApiV1GuestTeachersGet200Response | ApiV1SchoolsGet200Response
      >;
      const formValues = {
        name: this.completeProfileForm.controls['schoolName'].value,
        firstName: this.completeProfileForm.controls['firstName'].value,
        prefix: this.completeProfileForm.controls['prefix'].value,
        surname: this.completeProfileForm.controls['surname'].value,
        address: this.completeProfileForm.controls['address'].value,
        postalCode: this.completeProfileForm.controls['postalCode'].value.toUpperCase(),
      };
      if (this.completeProfileForm.controls['role'].value === Roles.GuestTeacher) {
        delete formValues.name;
        createOrUpdateCall = this.guestTeacherService.createOrUpdate(
          formValues as GuestTeacherPostResource
        );
      } else {
        createOrUpdateCall = this.schoolService.createOrUpdate(formValues as SchoolPostResource);
      }
      return firstValueFrom(createOrUpdateCall)
        .then((result: ApiV1GuestTeachersGet200Response | ApiV1SchoolsGet200Response) => {
          console.log('createOrUpdate profile result', result);
            this.permissionController.setRoleId(result.id);
          if ('availability' in result) {
            this.permissionController.setRoleType(Roles.GuestTeacher);
          } else {
            this.permissionController.setRoleType(Roles.School);
          }
          return firstValueFrom(
            this.authService.getAccessTokenSilently().pipe(switchMap(() => this.authService.user$))
          ).then((user: User | null | undefined) => {
            // this.permissionController.setAuthorizations({
            console.log('user', user);
            this.dialogRef.close(true);
            return true;
          });
        })
        .catch((error: any) => {
          console.error('createOrUpdate profile error', error);
          this.savingProfile = false;
          return false;
        });
    });
  }

  public logOut(): void {
    this.dialogRef.close(false);
    this.authService.logout();
  }
}
