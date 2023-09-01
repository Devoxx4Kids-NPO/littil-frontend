import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentContainerModule } from '../../../components/content-container/content-container.module';
import { FooterModule } from '../../../components/footer/footer.module';
import { HomepageComponent } from './homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
];

@NgModule({
  declarations: [HomepageComponent],
    imports: [
        CommonModule,
        ContentContainerModule,
        RouterModule.forChild(routes),
        FooterModule,
    ],
  providers: [],
  exports: [HomepageComponent],
  entryComponents: [],
})
export class HomePageModule {}
