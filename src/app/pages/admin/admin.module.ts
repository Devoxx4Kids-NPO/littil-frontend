import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { routes } from './admin.routing';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [AdminComponent],
  entryComponents: [],
})
export class AdminModule {}
