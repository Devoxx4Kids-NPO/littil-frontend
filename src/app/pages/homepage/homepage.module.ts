import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '../../components/button/button.module';
import { LoginModalModule } from '../login-modal/login-modal.module';
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
    RouterModule.forChild(routes),
    LoginModalModule,
    ButtonModule,
  ],
  providers: [],
  exports: [HomepageComponent],
  entryComponents: [],
})
export class HomePageModule {}
