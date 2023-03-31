import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileComponent} from './profile.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MockProvider} from "ng-mocks";
import {PermissionController, Roles} from "../../../services/permission.controller";
import {LittilTeacherService} from "../../../services/littil-teacher/littil-teacher.service";
import {LittilSchoolService} from "../../../services/littil-school/littil-school.service";
import {of} from "rxjs";
import {GuestTeacher, School} from "../../../api/generated";
import {AvailabilityService} from "../../../services/availability.service";
import {AuthService} from "@auth0/auth0-angular";
import {By} from "@angular/platform-browser";
import {HttpResponse} from "@angular/common/http";


const updateForm = (user: School | GuestTeacher, form: FormGroup) => {
  form.controls['firstName'].setValue(user.firstName);
  form.controls['prefix'].setValue(user.prefix);
  form.controls['surname'].setValue(user.surname);
  form.controls['address'].setValue(user.address);
  form.controls['postalCode'].setValue(user.postalCode);
}

const updateSchoolForm = (user: School, form: FormGroup) => {
  updateForm(user, form);
  form.controls['schoolName'].setValue(user.name);
}

const updateTeacherForm = (user: GuestTeacher, form: FormGroup) => {
  updateForm(user, form);
  let availabilityGroup = form.controls['availability'] as FormGroup

  const availability = user.availability === undefined ? [] : user.availability

  Object.keys(availabilityGroup.controls).forEach(key => {
    availabilityGroup.controls[key].setValue(key in availability);
  });
}

const guestTeacherUser: GuestTeacher = {
  id: "1234",
  firstName: "Gast",
  prefix: "",
  surname: "Leraar",
  locale: "",
  address: "straat 1",
  postalCode: "5301NE",
  availability: [
    "MONDAY", "WEDNESDAY"
  ]
}

const schoolUser: School = {
  id: "1234",
  name: "School",
  firstName: "Gebruiker",
  prefix: "van de",
  surname: "School",
  address: "straat 1",
  postalCode: "5301NE",
}

describe('TeacherProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        FormBuilder,
        MockProvider(PermissionController, {
          getRoleType: () => Roles.GuestTeacher,
          activeAccount: { email: 'test@test.nl' }
        }),
        MockProvider(LittilTeacherService, {
          getById: () => of(guestTeacherUser),
          createOrUpdate: () => of(guestTeacherUser),
          delete: () => of(HttpResponse)
        }),
        MockProvider(LittilSchoolService, {
          getById: () => of(schoolUser),
          createOrUpdate: () => of(schoolUser),
          delete: () => of(HttpResponse)
        }),
        MockProvider(AuthService, {
          isLoading$: of(false)
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate a guest teacher', async () => {
    updateTeacherForm(guestTeacherUser, component.profileForm)
    await component.onClickSaveProfile()
    expect(component.profileForm.controls['firstName'].value).toEqual(guestTeacherUser.firstName)
    expect(component.profileForm.controls['prefix'].value).toEqual(guestTeacherUser.prefix)
    expect(component.profileForm.controls['surname'].value).toEqual(guestTeacherUser.surname)
    expect(component.profileForm.controls['address'].value).toEqual(guestTeacherUser.address)
    expect(component.profileForm.controls['postalCode'].value).toEqual(guestTeacherUser.postalCode)
    expect(component.profileForm.invalid).toBe(false);
  });

  it('should handle a guest teacher availability', async () => {
    updateTeacherForm(guestTeacherUser, component.profileForm)
    let availabilityGroup = component.profileForm.controls['availability'] as FormGroup
    const availability = guestTeacherUser.availability === undefined ? [] : guestTeacherUser.availability

    for (let day of AvailabilityService.getAll()) {
      expect(availabilityGroup.controls[day.value]).toBeDefined()
      expect(availabilityGroup.controls[day.value].value).toEqual(day.value in availability)
    }

    await component.onClickSaveProfile()
    expect(component.profileForm.invalid).toBe(false);
  });

  it('should handle a empty guest teacher availability', async () => {
    updateTeacherForm(guestTeacherUser, component.profileForm)
    let availabilityGroup = component.profileForm.controls['availability'] as FormGroup
    guestTeacherUser.availability = []

    for (let day of AvailabilityService.getAll()) {
      expect(availabilityGroup.controls[day.value]).toBeDefined()
      expect(availabilityGroup.controls[day.value].value).toEqual(false)
    }
    await component.onClickSaveProfile()
    expect(component.profileForm.invalid).toBe(false);
  });

  it('should handle a incomplete guest teacher data', async () => {
    const user = Object.assign(guestTeacherUser, {firstName: "", surname: "", prefix: ""})
    updateTeacherForm(user, component.profileForm)

    await component.onClickSaveProfile()

    expect(component.profileForm.controls['firstName'].status).toBe('INVALID');
    expect(component.profileForm.controls['surname'].status).toBe('INVALID');
    expect(component.profileForm.controls['prefix'].status).toBe('VALID');

    expect(component.profileForm.invalid).toBe(true);
  });

  it('should show the delete area when the delete profile button is clicked', () => {
    const debug: DebugElement = fixture.debugElement
    expect(debug.query(By.css('[data-test="delete_profile"]'))).toBeNull()
    const button: DebugElement = debug.query(By.css('[data-test="enable_delete_profile"]'))
    button.nativeElement.click()
    fixture.detectChanges()
    expect(debug.query(By.css('[data-test="delete_profile"]'))).not.toBeNull()
  });

  it('should trigger the delete function when the right input is provided', () => {
      component.deleteProfileForm.controls['email'].setValue('invalid')
      component.deleteProfile()
      // expect(component.deleteProfileForm.controls['email'].errors).toContain(true)
  });
});

describe('SchoolProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        FormBuilder,
        MockProvider(PermissionController, {
          getRoleType: () => Roles.School,
          activeAccount: { email: 'test@test.nl' }
        }),
        MockProvider(LittilTeacherService, {
          getById: () => of(guestTeacherUser),
          createOrUpdate: () => of(guestTeacherUser),
          delete: () => of(HttpResponse)
        }),
        MockProvider(LittilSchoolService, {
          getById: () => of(schoolUser),
          createOrUpdate: () => of(schoolUser),
          delete: () => of(HttpResponse)
        }),
        MockProvider(AuthService, {
          isLoading$: of(false)
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should populate a school', async () => {
    updateSchoolForm(schoolUser, component.profileForm)
    await component.onClickSaveProfile()
    expect(component.profileForm.controls['schoolName'].value).toEqual(schoolUser.name)
    expect(component.profileForm.controls['firstName'].value).toEqual(schoolUser.firstName)
    expect(component.profileForm.controls['prefix'].value).toEqual(schoolUser.prefix)
    expect(component.profileForm.controls['surname'].value).toEqual(schoolUser.surname)
    expect(component.profileForm.controls['address'].value).toEqual(schoolUser.address)
    expect(component.profileForm.controls['postalCode'].value).toEqual(schoolUser.postalCode)
    expect(component.profileForm.invalid).toBe(false);
  });

});
