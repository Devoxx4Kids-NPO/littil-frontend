import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'src/app/components/button/button.module';
import { FormInputRadioModule } from 'src/app/components/forms/radio-input/form-input-radio.module';
import { FormInputPasswordModule } from '../../components/forms/password-input/form-input-password.module';
import { FormInputTextModule } from '../../components/forms/text-input/form-input-text.module';
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
  ],
  exports: [LoginModalComponent],
  entryComponents: [LoginModalComponent],
})
export class LoginModalModule {}
