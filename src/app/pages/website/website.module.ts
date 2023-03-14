import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '../../components/button/button.module';
import { ContentContainerModule } from '../../components/content-container/content-container.module';
import { MainMenuButtonModule } from '../../components/main-menu-button/main-menu-button.module';
import { MainMenuDropdownButtonModule } from '../../components/main-menu-dropdown-button/main-menu-dropdown-button.module';
import { RegisterModalModule } from '../../components/register-modal/register-modal.module';
import { WebsiteComponent } from './website.component';
import { websiteRoutes } from './website.routing';
import {ContactBannerModule} from "../../components/contact-banner/contact-banner.module";
@NgModule({
  declarations: [WebsiteComponent],
  imports: [
    CommonModule,
    ContentContainerModule,
    ContactBannerModule,
    ButtonModule,
    RegisterModalModule,
    MainMenuButtonModule,
    MainMenuDropdownButtonModule,
    RouterModule.forChild(websiteRoutes),
  ],
  providers: [],
  exports: [RouterModule],
  entryComponents: [],
})
export class WebsiteModule {}
