import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileContainerComponent} from './profile-container.component';
import {ContentContainerModule} from "../content-container/content-container.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    ProfileContainerComponent
  ],
  imports: [
    CommonModule,
    ContentContainerModule,
    RouterModule
  ],
  exports: [
    ProfileContainerComponent
  ]
})
export class ProfileContainerModule {
}
