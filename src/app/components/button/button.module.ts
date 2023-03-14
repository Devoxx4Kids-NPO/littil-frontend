import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';
import { ButtonRoundedComponent } from './button-rounded.component';

@NgModule({
  declarations: [ButtonComponent, ButtonRoundedComponent ],
  imports: [CommonModule],
  providers: [],
  exports: [ButtonComponent, ButtonRoundedComponent],
})
export class ButtonModule {}
