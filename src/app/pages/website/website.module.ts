import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '../../components/button/button.module';
import { ContentContainerModule } from '../../components/content-container/content-container.module';
import { MainMenuButtonModule } from '../../components/main-menu-button/main-menu-button.module';
import { LoginModalModule } from '../../components/login-modal/login-modal.module';
import { WebsiteComponent } from './website.component';
import { websiteRoutes } from './website.routing';

@NgModule({
  declarations: [WebsiteComponent],
  imports: [
    CommonModule,
    ContentContainerModule,
    ButtonModule,
    LoginModalModule,
    MainMenuButtonModule,
    RouterModule.forChild(websiteRoutes),
  ],
  providers: [],
  exports: [RouterModule],
  entryComponents: [],
})
export class WebsiteModule {}