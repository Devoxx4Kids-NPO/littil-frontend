import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactBannerComponent } from './contact-banner.component';
import { RouterLinkWithHref } from '@angular/router';

@NgModule({
  declarations: [
    ContactBannerComponent
  ],
  exports: [
    ContactBannerComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref
  ]
})
export class ContactBannerModule { }
