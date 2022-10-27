import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { RouterModule, Routes } from "@angular/router";
import { ContentContainerModule } from "../../../components/content-container/content-container.module";
import { TitleModule } from "../../../components/title/title.module";
import { FormInputTextModule } from "../../../components/forms/text-input/form-input-text.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "../../../components/button/button.module";
import { FormInputSelectModule } from "../../../components/forms/select-input/form-input-select.module";

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
  },
];

@NgModule({
  declarations: [ContactComponent],
    imports: [
        ButtonModule,
        CommonModule,
        ContentContainerModule,
        FormInputSelectModule,
        FormInputTextModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        TitleModule,
    ]
})
export class ContactModule {
}
