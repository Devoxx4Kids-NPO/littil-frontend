import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentContainerModule } from '../../../components/content-container/content-container.module';
import { FooterModule } from '../../../components/footer/footer.module';
import { AboutUsComponent } from "./about-us.component";
import { ButtonModule } from "../../../components/button/button.module";
import { TitleModule } from "../../../components/title/title.module";
import {ContactBannerModule} from "../../../components/contact-banner/contact-banner.module";

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent,
  },
];

@NgModule({
  declarations: [AboutUsComponent],
    imports: [
        ButtonModule,
        CommonModule,
        ContentContainerModule,
        TitleModule,
        RouterModule.forChild(routes),
        FooterModule,
        ContactBannerModule,
    ],
})
export class AboutUsModule { }
