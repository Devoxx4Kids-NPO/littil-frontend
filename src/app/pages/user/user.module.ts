import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { routes } from './user.routing';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [UserComponent],
  entryComponents: [],
})
export class UserModule {}

