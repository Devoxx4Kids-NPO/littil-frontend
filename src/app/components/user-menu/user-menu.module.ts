import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {UserMenuComponent} from "./user-menu.component";
import {ButtonModule} from "../button/button.module";
@NgModule({
  declarations: [UserMenuComponent],
  imports: [CommonModule, ButtonModule],
  providers: [],
  exports: [UserMenuComponent],
})
export class UserMenuModule {}
