import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HomepageComponent } from './homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
];

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    ContentContainerComponent,
    RouterModule.forChild(routes),
    FooterComponent,
  ],
  exports: [HomepageComponent],
})
export class HomePageModule {}
