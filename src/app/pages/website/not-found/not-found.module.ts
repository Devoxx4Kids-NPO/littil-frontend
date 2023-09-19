import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLinkWithHref, RouterModule } from '@angular/router';
import { FooterModule } from '../../../components/footer/footer.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    RouterModule.forChild([
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]),
    FooterModule,
  ]
})
export class NotFoundModule {
}
