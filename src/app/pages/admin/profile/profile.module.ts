import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormErrorMessageComponent } from '../../../components/forms/form-error-message/form-error-message.component';
import { FormInputRadioComponent } from '../../../components/forms/radio-input/form-input-radio.component';
import { FormInputTextComponent } from '../../../components/forms/text-input/form-input-text.component';
import { ProfileContainerComponent } from '../../../components/profile-container/profile-container.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProfileContainerComponent,
    ContentContainerComponent,
    ButtonComponent,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormInputTextComponent,
    FormInputRadioComponent,
    FormErrorMessageComponent,
    FooterComponent,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
