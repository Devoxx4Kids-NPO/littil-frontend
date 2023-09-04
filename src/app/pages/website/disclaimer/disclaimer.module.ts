import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '../../../components/footer/footer.module';
import { RouterModule, Routes } from "@angular/router";
import { ContentContainerModule } from "../../../components/content-container/content-container.module";
import { TitleModule } from "../../../components/title/title.module";
import {DisclaimerComponent} from "./disclaimer.component";

const routes: Routes = [
  {
    path: '',
    component: DisclaimerComponent,
  },
];

@NgModule({
  declarations: [DisclaimerComponent],
    imports: [
        CommonModule,
        ContentContainerModule,
        RouterModule.forChild(routes),
        TitleModule,
        FooterModule,
    ]
})
export class DisclaimerModule {
}
