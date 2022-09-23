import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainMenuButtonComponent } from './main-menu-button.component';

@NgModule({
  declarations: [MainMenuButtonComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [],
  exports: [MainMenuButtonComponent],
})
export class MainMenuButtonModule {
}
