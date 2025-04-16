import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompleteProfileModalComponent } from '../../components/complete-profile-modal/complete-profile-modal.component';
import { CompleteProfilePageComponent } from './complete-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
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
    MatDialogModule
  ],
  exports: [CompleteProfilePageComponent],
})
export class CompleteProfilePageModule {}
