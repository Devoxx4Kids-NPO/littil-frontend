import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ProfileContainerComponent } from '../../../components/profile-container/profile-container.component';
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
    CommonModule,
    ProfileContainerComponent,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FooterComponent,
    ButtonComponent,
  ],
  exports: [ModulesComponent],
})
export class ModulesModule {}
