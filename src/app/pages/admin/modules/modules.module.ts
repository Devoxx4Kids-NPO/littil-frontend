import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '../../../components/footer/footer.module';
import { ModulesComponent } from './modules.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileContainerModule } from '../../../components/profile-container/profile-container.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../../../components/button/button.module';

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
  },
];

@NgModule({
  declarations: [
    ModulesComponent
  ],
  imports: [
    CommonModule,
    ProfileContainerModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FooterModule,
    ButtonModule,
  ],
  exports: [
    ModulesComponent
  ]
})
export class ModulesModule {
}
