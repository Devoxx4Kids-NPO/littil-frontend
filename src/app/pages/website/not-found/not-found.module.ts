import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FooterComponent } from '../../../components/footer/footer.component';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule.forChild([
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]),
    FooterComponent,
  ],
})
export class NotFoundModule {}
