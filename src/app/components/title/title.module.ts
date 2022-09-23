import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TitleComponent } from "./title.component";
import { ContentContainerModule } from "../content-container/content-container.module";

@NgModule({
  declarations: [TitleComponent],
  imports: [
    CommonModule,
    ContentContainerModule
  ],
  providers: [],
  exports: [TitleComponent],
})
export class TitleModule {}
