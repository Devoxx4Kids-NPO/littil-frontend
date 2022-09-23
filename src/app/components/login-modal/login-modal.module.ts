import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from '../button/button.module';
import { FormErrorMessageModule } from '../forms/form-error-message/form-error-message.module';
import { FormInputPasswordModule } from '../forms/password-input/form-input-password.module';
import { FormInputRadioModule } from '../forms/radio-input/form-input-radio.module';
import { FormInputTextModule } from '../forms/text-input/form-input-text.module';
import { LoginModalComponent } from './login-modal.component';

@NgModule({
  declarations: [LoginModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FormInputTextModule,
    FormInputPasswordModule,
    FormInputRadioModule,
    FormErrorMessageModule,
  ],
  exports: [LoginModalComponent],
  entryComponents: [LoginModalComponent],
})
export class LoginModalModule {}
