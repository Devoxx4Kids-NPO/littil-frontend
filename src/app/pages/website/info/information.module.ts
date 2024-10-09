import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactBannerComponent } from '../../../components/contact-banner/contact-banner.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { TitleComponent } from '../../../components/title/title.component';
import { InformationComponent } from './information/information.component';
import { SchoolsComponent } from './schools/schools.component';
import { SpecialistsComponent } from './specialists/specialists.component';
import { SponsorsComponent } from './sponsors/sponsors.component';

const routes: Routes = [
  {
    path: '',
    component: InformationComponent,
  },
  {
    path: 'schools',
    component: SchoolsComponent,
  },
  {
    path: 'it-specialists',
    component: SpecialistsComponent,
  },
  {
    path: 'sponsors',
    component: SponsorsComponent,
  },
];

@NgModule({
  declarations: [InformationComponent, SchoolsComponent, SpecialistsComponent, SponsorsComponent],
  imports: [
    CommonModule,
    ContentContainerComponent,
    RouterModule.forChild(routes),
    TitleComponent,
    ContactBannerComponent,
    FooterComponent,
  ],
})
export class InformationModule {}
