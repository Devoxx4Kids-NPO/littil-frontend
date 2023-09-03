import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '../../../components/footer/footer.module';
import { RouterModule, Routes } from "@angular/router";
import { ContentContainerModule } from "../../../components/content-container/content-container.module";
import { TitleModule } from "../../../components/title/title.module";
import { FormInputTextModule } from "../../../components/forms/text-input/form-input-text.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "../../../components/button/button.module";
import { FormInputSelectModule } from "../../../components/forms/select-input/form-input-select.module";
import {PrivacyPolicyComponent} from "./privacy-policy.component";

const routes: Routes = [
  {
    path: '',
    component: PrivacyPolicyComponent,
  },
];

@NgModule({
  declarations: [PrivacyPolicyComponent],
    imports: [
        ButtonModule,
        CommonModule,
        ContentContainerModule,
        FormInputSelectModule,
        FormInputTextModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        TitleModule,
        FooterModule,
    ]
})
export class PrivacyPolicyModule {
}
