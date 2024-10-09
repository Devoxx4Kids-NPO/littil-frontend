import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { ContactBannerComponent } from '../../components/contact-banner/contact-banner.component';
import { ContentContainerComponent } from '../../components/content-container/content-container.component';
import { MainMenuDropdownButtonComponent } from '../../components/main-menu-dropdown-button/main-menu-dropdown-button.component';
import { RegisterModalComponent } from '../../components/register-modal/register-modal.component';
import { WebsiteComponent } from './website.component';
import { websiteRoutes } from './website.routing';
@NgModule({
  declarations: [WebsiteComponent],
  imports: [
    CommonModule,
    ContentContainerComponent,
    ContactBannerComponent,
    ButtonComponent,
    RegisterModalComponent,
    MainMenuDropdownButtonComponent,
    RouterModule.forChild(websiteRoutes),
  ],
  exports: [RouterModule],
})
export class WebsiteModule {}
