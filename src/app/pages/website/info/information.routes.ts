import { Routes } from '@angular/router';
import { InformationComponent } from './information/information.component';
import { SchoolsComponent } from './schools/schools.component';
import { SpecialistsComponent } from './specialists/specialists.component';
import { SponsorsComponent } from './sponsors/sponsors.component';

export const routes: Routes = [
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
