import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactBannerComponent } from './contact-banner.component';
import { RouterLinkWithHref } from '@angular/router';
import {ButtonModule} from "../button/button.module";

@NgModule({
  declarations: [
    ContactBannerComponent
  ],
  exports: [
    ContactBannerComponent
  ],
    imports: [
        CommonModule,
        RouterLinkWithHref,
        ButtonModule
    ]
})
export class ContactBannerModule { }
