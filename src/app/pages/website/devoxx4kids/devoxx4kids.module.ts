import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { TitleComponent } from '../../../components/title/title.component';
import { Devoxx4kidsComponent } from './devoxx4kids.component';

const routes: Routes = [
  {
    path: '',
    component: Devoxx4kidsComponent,
  },
];

@NgModule({
  declarations: [Devoxx4kidsComponent],
  imports: [
    CommonModule,
    ContentContainerComponent,
    TitleComponent,
    RouterModule.forChild(routes),
    FooterComponent,
  ],
})
export class Devoxx4kidsModule {}
