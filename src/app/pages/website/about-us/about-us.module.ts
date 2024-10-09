import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { ContactBannerComponent } from '../../../components/contact-banner/contact-banner.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { TitleComponent } from '../../../components/title/title.component';
import { AboutUsComponent } from './about-us.component';

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent,
  },
];

@NgModule({
  declarations: [AboutUsComponent],
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
export class AboutUsModule {}
