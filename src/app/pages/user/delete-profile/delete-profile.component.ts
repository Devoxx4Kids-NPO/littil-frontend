import { Component } from '@angular/core';
import { PermissionController, Roles } from "../../../services/permission.controller";
import { HttpResponse } from "@angular/common/http";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule, ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import { LittilTeacherService } from "../../../services/littil-teacher/littil-teacher.service";
import { LittilSchoolService } from "../../../services/littil-school/littil-school.service";
import { AuthService } from "@auth0/auth0-angular";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../../../components/button/button.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormInputTextComponent } from "../../../components/forms/text-input/form-input-text.component";
import { FormErrorMessageComponent } from "../../../components/forms/form-error-message/form-error-message.component";
import { ProfileContainerComponent } from "../../../components/profile-container/profile-container.component";

@Component({
  selector: 'littil-delete-profile',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormInputTextComponent,
    FormErrorMessageComponent,
    ProfileContainerComponent
  ],
  templateUrl: './delete-profile.component.html',
})
export class DeleteProfileComponent {
  private readonly roleType: Roles;
  private readonly roleId: string;

  public deleteProfileForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      matchLoggedInEmailValidator(this.permissionController.activeAccount.email)
    ]),
  });

  constructor(
    private readonly permissionController: PermissionController,
    private readonly littilTeacherService: LittilTeacherService,
    private readonly littilSchoolService: LittilSchoolService,
    public auth: AuthService,
  ) {
    this.roleType = this.permissionController.getRoleType();
    this.roleId = this.permissionController.getRoleId();
  }

  validEmail(): boolean {
    const control = this.deleteProfileForm.controls['email'];
    return control.valid && control.value === this.permissionController.activeAccount.email;
  }

  deleteProfile(): void {
    const deletionObservable =
      this.roleType == Roles.GuestTeacher
        ? this.littilTeacherService.delete(this.roleId)
        : this.littilSchoolService.delete(this.roleId);

    deletionObservable.subscribe((response: HttpResponse<any> | null) => {
      if (response?.ok) {
        this.auth.logout();
      }
    });
  }
}

function matchLoggedInEmailValidator(loggedInEmail: string | undefined): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; // laat required dit afhandelen
    return control.value === loggedInEmail ? null : { emailMismatch: true };
  };
}
