import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from '../button/button.module';
import { FormErrorMessageModule } from '../forms/form-error-message/form-error-message.module';
import { FormInputPasswordModule } from '../forms/password-input/form-input-password.module';
import { FormInputRadioModule } from '../forms/radio-input/form-input-radio.module';
import { FormInputTextModule } from '../forms/text-input/form-input-text.module';
import { RegisterModalComponent } from './register-modal.component';

@NgModule({
  declarations: [RegisterModalComponent],
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
  exports: [RegisterModalComponent],
  entryComponents: [RegisterModalComponent],
})
export class RegisterModalModule {}
