import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { MainMenuDropdownButtonComponent } from "./main-menu-dropdown-button.component";

@NgModule({
  declarations: [MainMenuDropdownButtonComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MainMenuDropdownButtonComponent]
})
export class MainMenuDropdownButtonModule { }
