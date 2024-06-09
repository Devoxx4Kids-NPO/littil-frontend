import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentContainerModule } from '../../../components/content-container/content-container.module';
import { FooterModule } from '../../../components/footer/footer.module';
import { ModulesComponent } from "./modules.component";
import { ButtonModule } from "../../../components/button/button.module";
import { TitleModule } from "../../../components/title/title.module";
import {ContactBannerModule} from "../../../components/contact-banner/contact-banner.module";

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
  },
];

@NgModule({
  declarations: [ModulesComponent],
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
export class ModulesModule { }
