import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';
import { ContentContainerModule } from '../../../components/content-container/content-container.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { ButtonModule } from '../../../components/button/button.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
];

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GoogleMapsModule,
    ContentContainerModule,
    ButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [SearchComponent],
  entryComponents: [],
})
export class SearchModule {}
