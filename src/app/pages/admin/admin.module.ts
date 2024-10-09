import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentContainerModule} from "../../components/content-container/content-container.module";
import {RouterModule, Routes} from "@angular/router";
import { FooterModule } from '../../components/footer/footer.module';
import {AdminComponent} from "./admin/admin.component";
import { TitleModule } from "../../components/title/title.module";
import {ContactBannerModule} from "../../components/contact-banner/contact-banner.module";
import {UsersComponent} from "./users/users.component";

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
  declarations: [
    AdminComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    ContentContainerModule,
    RouterModule.forChild(routes),
    TitleModule,
    ContactBannerModule,
    FooterModule
  ],
  exports: [ContactBannerModule]
})
export class AdminModule { }
