import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from '../button/button.module';
import { FormErrorMessageModule } from '../forms/form-error-message/form-error-message.module';
import { FormInputRadioModule } from '../forms/radio-input/form-input-radio.module';
import { FormInputTextModule } from '../forms/text-input/form-input-text.module';
import { ContactModalComponent } from './contact-modal.component';

@NgModule({
  declarations: [ContactModalComponent],
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
  exports: [ContactModalComponent],
  entryComponents: [ContactModalComponent],
})
export class ContactModalModule {}
