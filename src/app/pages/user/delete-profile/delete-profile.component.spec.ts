import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DeleteProfileComponent } from './delete-profile.component';
import { PermissionController, Roles } from '../../../services/permission.controller';
import { LittilTeacherService } from "../../../services/littil-teacher/littil-teacher.service";
import { LittilSchoolService } from '../../../services/littil-school/littil-school.service';
import { AuthService } from "@auth0/auth0-angular";
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { ActivatedRouteStub } from "@ngneat/spectator";
import { By } from "@angular/platform-browser";
import { ButtonComponent } from "../../../components/button/button.component";

describe('DeleteProfileComponent', () => {
  let component: DeleteProfileComponent;
  let permissionControllerMock: any;
  let teacherServiceMock: any;
  let schoolServiceMock: any;
  let authServiceMock: any;
  let fixture: ComponentFixture<DeleteProfileComponent>;

  beforeEach(() => {
    permissionControllerMock = {
      getRoleType: jest.fn(),
      getRoleId: jest.fn(),
      activeAccount: { email: 'test@example.com' }
    };

    teacherServiceMock = {
      delete: jest.fn()
    };

    schoolServiceMock = {
      delete: jest.fn()
    };

    authServiceMock = {
      logout: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: PermissionController, useValue: permissionControllerMock },
        { provide: LittilTeacherService, useValue: teacherServiceMock },
        { provide: LittilSchoolService, useValue: schoolServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ActivatedRoute, useValue: ActivatedRouteStub },
      ]
    });

    fixture = TestBed.createComponent(DeleteProfileComponent);
    component = fixture.componentInstance;
  });

  it('should disable the button when email is invalid', () => {
    const button = fixture.debugElement.query(By.directive(ButtonComponent)).componentInstance;

    // Initially empty -> invalid
    fixture.detectChanges();
    expect(button.disabled).toBeTruthy();

    // Set invalid email
    component.deleteProfileForm.get('email')?.setValue('invalid-email');
    fixture.detectChanges();
    expect(button.disabled).toBeTruthy();

    // Set valid email but not matching logged-in email
    component.deleteProfileForm.get('email')?.setValue('valid@example.com');
    fixture.detectChanges();
    expect(button.disabled).toBeTruthy();

    // Set valid and matching email
    component.deleteProfileForm.get('email')?.setValue('test@example.com');
    fixture.detectChanges();
    expect(button.disabled).not.toBeTruthy();
  });

  it('should call teacherService.delete and logout for GuestTeacher', () => {
    // Set mocks BEFORE creating component
    permissionControllerMock.getRoleType.mockReturnValue(Roles.GuestTeacher);
    permissionControllerMock.getRoleId.mockReturnValue('123');

    // Recreate component so constructor picks up mocks
    const fixture = TestBed.createComponent(DeleteProfileComponent);
    component = fixture.componentInstance;

    component.deleteProfileForm.controls['email'].setValue('test@example.com');
    teacherServiceMock.delete.mockReturnValue(of(new HttpResponse({ status: 200 })));

    component.deleteProfile();

    expect(teacherServiceMock.delete).toHaveBeenCalledWith('123');
    expect(authServiceMock.logout).toHaveBeenCalled();
  });

  it('should call schoolService.delete and logout for School role', () => {
    // Set mocks BEFORE creating component
    permissionControllerMock.getRoleType.mockReturnValue(Roles.School);
    permissionControllerMock.getRoleId.mockReturnValue('456');

    // Recreate component so constructor picks up mocks
    const fixture = TestBed.createComponent(DeleteProfileComponent);
    component = fixture.componentInstance;

    component.deleteProfileForm.controls['email'].setValue('test@example.com');
    schoolServiceMock.delete.mockReturnValue(of(new HttpResponse({ status: 200 })));

    component.deleteProfile();

    expect(schoolServiceMock.delete).toHaveBeenCalledWith('456');
    expect(authServiceMock.logout).toHaveBeenCalled();
  });
});
