import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { Devoxx4kidsComponent } from './devoxx4kids.component';
import { TitleModule } from "../../../components/title/title.module";
import { ContentContainerModule } from "../../../components/content-container/content-container.module";

const routes: Routes = [
  {
    path: '',
    component: Devoxx4kidsComponent,
  },
];

@NgModule({
  declarations: [Devoxx4kidsComponent],
  imports: [
    CommonModule,
    ContentContainerModule,
    TitleModule,
    RouterModule.forChild(routes),
  ]
})
export class Devoxx4kidsModule {
}
