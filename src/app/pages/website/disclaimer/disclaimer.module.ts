import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { TitleComponent } from '../../../components/title/title.component';
import { DisclaimerComponent } from './disclaimer.component';

const routes: Routes = [
  {
    path: '',
    component: DisclaimerComponent,
  },
];

@NgModule({
  declarations: [DisclaimerComponent],
  imports: [
    CommonModule,
    ContentContainerComponent,
    RouterModule.forChild(routes),
    TitleComponent,
    FooterComponent,
  ],
})
export class DisclaimerModule {}
