import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, firstValueFrom } from 'rxjs';
import { DayOfWeek, GuestTeacher, School } from '../../../api/generated';
import { AvailabilityService } from '../../../services/availability.service';
import { LittilSchoolService } from '../../../services/littil-school/littil-school.service';
import { LittilTeacherService } from '../../../services/littil-teacher/littil-teacher.service';
import {
  PermissionController,
  Roles,
} from '../../../services/permission.controller';
import { FormUtil } from '../../../utils/form.util';

@Component({
  selector: 'littil-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private readonly roleType: Roles;
  private readonly roleId: string;
  private userObservable: Observable<GuestTeacher | School>;
  private user!: GuestTeacher | School;
  public loading: boolean = true;
  public FormUtil = FormUtil;
  public profileForm!: FormGroup;
  public isSchool = false;
  public deleteProfileOpen = false;

  public deleteProfileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private permissionController: PermissionController,
    private littilTeacherService: LittilTeacherService,
    private littilSchoolService: LittilSchoolService,
    private _formBuilder: FormBuilder,
    public auth: AuthService
  ) {
    this.roleType = this.permissionController.getRoleType();
    this.roleId = this.permissionController.getRoleId();
    // TODO: What if a site admin visits this page?
    this.userObservable =
      this.roleType == Roles.GuestTeacher
        ? this.littilTeacherService.getById(this.roleId)
        : this.littilSchoolService.getById(this.roleId);

    this.isSchool = this.roleType === Roles.School;

    this.userObservable.subscribe((user: School | GuestTeacher) => {
      this.user = user;
      this.profileForm = this._createForm();
      this.loading = false;
    });
  }

  get days(): { description: string; value: string }[] {
    return AvailabilityService.getAll();
  }

  private _createForm(): FormGroup {
    const form: FormGroup = this._formBuilder.group({
      firstName: new FormControl(this.user.firstName, [Validators.required]),
      prefix: new FormControl(this.user.prefix),
      surname: new FormControl(this.user.surname, Validators.required),
      address: new FormControl(this.user.address, Validators.required),
      postalCode: new FormControl(this.user.postalCode, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]{3}[s]?[A-Za-z]{2}$'),
      ]),
    });

    if ('availability' in this.user && this.user.availability !== undefined) {
      form.addControl(
        'availability',
        new FormGroup({
          MONDAY: new FormControl(
            Array.from(this.user.availability).includes('MONDAY')
          ),
          TUESDAY: new FormControl(
            Array.from(this.user.availability).includes('TUESDAY')
          ),
          WEDNESDAY: new FormControl(
            Array.from(this.user.availability).includes('WEDNESDAY')
          ),
          THURSDAY: new FormControl(
            Array.from(this.user.availability).includes('THURSDAY')
          ),
          FRIDAY: new FormControl(
            Array.from(this.user.availability).includes('FRIDAY')
          ),
          SATURDAY: new FormControl(
            Array.from(this.user.availability).includes('SATURDAY')
          ),
          SUNDAY: new FormControl(
            Array.from(this.user.availability).includes('SUNDAY')
          ),
        })
      );
    }

    if ('name' in this.user) {
      form.addControl(
        'schoolName',
        new FormControl(this.user.name, Validators.required)
      );
    }
    return form;
  }

  ngOnInit(): void {}

  parseDaysOfTheWeek(days: { [key: string]: boolean }): Array<DayOfWeek> {
    let result: DayOfWeek[] = [];
    for (const [k, v] of Object.entries(days)) {
      if (v) {
        result.push(k as DayOfWeek);
      }
    }
    return result;
  }

  public onCancelChanges(event: Event): void {
    event.preventDefault();
    const form = this.profileForm as FormGroup;
    for (let control in form.controls) {
      if (control in this.user && control !== 'availability') {
        form.controls[control].setValue(
          this.user[control as keyof typeof this.user]
        );
      }
      if (control === 'availability') {
        const availabilityGroup = form.controls[control] as FormGroup;
        for (let availabilityControl in availabilityGroup.controls) {
          availabilityGroup.controls[availabilityControl].setValue(
            this.user[control as keyof typeof this.user]?.includes(
              availabilityControl
            )
          );
        }
      }
    }
  }

  public onClickSaveProfile(): Promise<boolean> {
    return Promise.resolve().then(() => {
      FormUtil.ValidateAll(this.profileForm);
      if (this.profileForm.invalid) {
        return false;
      }

      let createOrUpdateCall: Observable<GuestTeacher | School>;
      const formValues = {
        id: this.user.id,
        firstName: this.profileForm.controls['firstName'].value,
        prefix: this.profileForm.controls['prefix'].value,
        surname: this.profileForm.controls['surname'].value,
        address: this.profileForm.controls['address'].value,
        postalCode: this.profileForm.controls['postalCode'].value,
      };

      if (this.roleType === Roles.GuestTeacher) {
        const teacher: GuestTeacher = Object.assign(formValues, {
          availability: this.parseDaysOfTheWeek(
            this.profileForm.controls['availability']?.value
          ),
        });
        createOrUpdateCall = this.littilTeacherService.createOrUpdate(
          teacher as GuestTeacher
        );
      } else {
        const school: School = Object.assign(formValues, {
          name: this.profileForm.controls['schoolName']?.value,
        });
        createOrUpdateCall = this.littilSchoolService.createOrUpdate(
          school as School
        );
      }
      return firstValueFrom(createOrUpdateCall)
        .then(() => {
          return true;
        })
        .catch((error: any) => {
          console.log(error);
          console.error('createOrUpdate profile error');
          return false;
        });
    });
  }

  deleteProfile(): void {
    const control = this.deleteProfileForm.controls['email'];
    if (control.value !== this.permissionController.activeAccount.email) {
      control.markAsTouched();
      control.setErrors({ email_missing: true });
      return;
    }
    const deletionObservable =
      this.roleType == Roles.GuestTeacher
        ? this.littilTeacherService.delete(this.roleId)
        : this.littilSchoolService.delete(this.roleId);

    deletionObservable.subscribe((response: HttpResponse<any>) => {
      if (response.ok) {
        this.auth.logout();
      }
    });
  }
}
