import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {RouterModule, Routes} from "@angular/router";
import {ContentContainerModule} from "../../../components/content-container/content-container.module";
import {ButtonModule} from "../../../components/button/button.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContentContainerModule,
    ButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
