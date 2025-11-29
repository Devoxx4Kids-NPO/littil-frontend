import { Component } from '@angular/core';
import {  ProfileContainerComponent } from "../../../components/profile-container/profile-container.component";
import { FormErrorMessageComponent } from "../../../components/forms/form-error-message/form-error-message.component";
import { FormInputTextComponent } from "../../../components/forms/text-input/form-input-text.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../../components/button/button.component";
import { CommonModule } from "@angular/common";
import { LittilUserService } from "../../../services/littil-user/littil-user.service";
import { HttpResponse } from "@angular/common/http";
import { PermissionController } from "../../../services/permission.controller";

@Component({
  selector: 'littil-change-email',
  standalone: true,
  imports: [
    CommonModule,
    ProfileContainerComponent,
    FormErrorMessageComponent,
    FormInputTextComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './change-email.component.html',
})
export class ChangeEmailComponent {
  protected hideForm: boolean = false;
  protected hideConfirmation: boolean = true;
  protected hideCancelConfirmation: boolean = true;
  protected emailConfirmed: boolean = false;
  private userId: string;

  constructor (
    permissionController: PermissionController,
    private readonly littilUserService: LittilUserService,
  ) {
    this.userId = permissionController.userId;
  }

  changeEmailForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    verificationCode: new FormControl('', [Validators.required]),
  });


  onClickConfirmNewEmail() {
    const emailAddres = this.changeEmailForm.get('email')?.value;
    const resource = { emailAddress: emailAddres };

    this.littilUserService.emailVerificationCode(this.userId, resource)
      .subscribe((response: HttpResponse<any> | null) => {
      if (response?.ok) {
        this.emailConfirmed = true;
      }
    })
  }

  onClickChangeEmail() {
    const emailAddres = this.changeEmailForm.get('email')?.value;
    const code = this.changeEmailForm.get('verificationCode')?.value;
    const resource = { newEmailAddress: emailAddres,verificationCode: code };

    this.littilUserService.changeEmail(this.userId, resource)
      .subscribe((response: HttpResponse<any> | null) => {
        if (response?.ok) {
          this.hideForm = true;
          this.hideConfirmation = false;
          // TODO change email at top of screen
        }
      })
  }

  validEmail(): boolean {
    return this.changeEmailForm.controls['email'].valid;
  }

  protected onClickCancel() {
    this.hideForm = true;
    this.hideConfirmation = true;
    this.hideCancelConfirmation = false;
    this.emailConfirmed = false;
  }
}
