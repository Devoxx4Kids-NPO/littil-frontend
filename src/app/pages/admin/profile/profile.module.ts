import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '../../../components/footer/footer.module';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from "@angular/router";
import { ContentContainerModule } from "../../../components/content-container/content-container.module";
import { ButtonModule } from "../../../components/button/button.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ReactiveFormsModule } from "@angular/forms";
import { FormInputTextModule } from "../../../components/forms/text-input/form-input-text.module";
import { FormInputRadioModule } from "../../../components/forms/radio-input/form-input-radio.module";
import { FormErrorMessageModule } from "../../../components/forms/form-error-message/form-error-message.module";
import { ProfileContainerModule } from "../../../components/profile-container/profile-container.module";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
];

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProfileContainerModule,
    ContentContainerModule,
    ButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormInputTextModule,
    FormInputRadioModule,
    FormErrorMessageModule,
    FooterModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule {
}
