import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
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
    ComponentsModule
  ],
  providers: [],
  exports: [HomepageComponent],
  entryComponents: [],
})
export class HomePageModule {}
