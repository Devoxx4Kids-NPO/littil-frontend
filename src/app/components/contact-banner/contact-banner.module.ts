import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactBannerComponent} from "./contact-banner.component";

@NgModule({
  declarations: [
    ContactBannerComponent
  ],
  exports: [
    ContactBannerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ContactBannerModule { }
