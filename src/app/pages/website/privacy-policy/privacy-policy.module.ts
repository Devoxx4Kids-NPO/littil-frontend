import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { TitleComponent } from '../../../components/title/title.component';
import { PrivacyPolicyComponent } from './privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    component: PrivacyPolicyComponent,
  },
];

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    ContentContainerComponent,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TitleComponent,
    FooterComponent,
  ],
})
export class PrivacyPolicyModule {}
