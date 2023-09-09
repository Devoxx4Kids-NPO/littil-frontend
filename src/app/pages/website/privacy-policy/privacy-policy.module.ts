import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '../../../components/footer/footer.module';
import { RouterModule, Routes } from "@angular/router";
import { ContentContainerModule } from "../../../components/content-container/content-container.module";
import { TitleModule } from "../../../components/title/title.module";
import { ReactiveFormsModule } from "@angular/forms";
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
        CommonModule,
        ContentContainerModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        TitleModule,
        FooterModule,
    ]
})
export class PrivacyPolicyModule {
}
