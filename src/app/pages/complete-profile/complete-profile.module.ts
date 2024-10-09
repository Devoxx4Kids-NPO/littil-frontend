import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteProfileModalComponent } from '../../components/complete-profile-modal/complete-profile-modal.component';
import { ModalControllerModule } from '../../components/modal/modal.controller.module';
import { CompleteProfilePageComponent } from './complete-profile.component';

const routes: Routes = [
  {
    path: '',
    component: CompleteProfilePageComponent,
  },
];

@NgModule({
  declarations: [CompleteProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CompleteProfileModalComponent,
    ModalControllerModule.forRoot(),
  ],
  exports: [CompleteProfilePageComponent],
})
export class CompleteProfilePageModule {}
