import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentContainerComponent } from './content-container.component';

@NgModule({
  declarations: [ContentContainerComponent],
  imports: [CommonModule],
  providers: [],
  exports: [ContentContainerComponent],
})
export class ContentContainerModule {}
