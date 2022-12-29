import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from '../button/button.module';
import { FormErrorMessageModule } from '../forms/form-error-message/form-error-message.module';
import { FormInputRadioModule } from '../forms/radio-input/form-input-radio.module';
import { FormInputTextModule } from '../forms/text-input/form-input-text.module';
import { CompleteProfileModalComponent } from './complete-profile-modal.component';

@NgModule({
  declarations: [CompleteProfileModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FormInputTextModule,
    FormInputRadioModule,
    FormErrorMessageModule,
  ],
  exports: [CompleteProfileModalComponent],
  entryComponents: [CompleteProfileModalComponent],
})
export class CompleteProfileModalModule {}
