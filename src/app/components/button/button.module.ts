import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule],
  providers: [],
  exports: [ButtonComponent],
})
export class ButtonModule {}
