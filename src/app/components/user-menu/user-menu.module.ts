import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserMenuComponent } from "./user-menu.component";
import { ButtonModule } from "../button/button.module";
import { AvatarModule } from "../avatar/avatar.module";
import { OnOutClickDirective } from "../../directives/on-outclick/on-outclick.directive";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ UserMenuComponent, OnOutClickDirective ],
  imports: [ CommonModule, ButtonModule, AvatarModule, RouterModule ],
  providers: [],
  exports: [ UserMenuComponent ],
})
export class UserMenuModule {
}
