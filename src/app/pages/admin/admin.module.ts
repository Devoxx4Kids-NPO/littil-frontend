import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactBannerComponent } from '../../components/contact-banner/contact-banner.component';
import { ContentContainerComponent } from '../../components/content-container/content-container.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TitleComponent } from '../../components/title/title.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
];

@NgModule({
  declarations: [AdminComponent, UsersComponent],
  imports: [
    CommonModule,
    ContentContainerComponent,
    RouterModule.forChild(routes),
    TitleComponent,
    ContactBannerComponent,
    FooterComponent,
  ],
})
export class AdminModule {}
