import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { ContactBannerComponent } from '../../../components/contact-banner/contact-banner.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { TitleComponent } from '../../../components/title/title.component';
import { ModulesComponent } from './modules.component';

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
  },
];

@NgModule({
  declarations: [ModulesComponent],
  imports: [
    ButtonComponent,
    CommonModule,
    ContentContainerComponent,
    TitleComponent,
    RouterModule.forChild(routes),
    FooterComponent,
    ContactBannerComponent,
  ],
})
export class ModulesModule {}
