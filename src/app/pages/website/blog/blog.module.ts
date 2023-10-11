import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { ContentContainerModule } from "../../../components/content-container/content-container.module";
import {TitleModule} from "../../../components/title/title.module";

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
];

@NgModule({
  declarations: [BlogComponent],
    imports: [
        CommonModule,
        ContentContainerModule,
        RouterModule.forChild(routes),
        TitleModule,
    ]
})
export class BlogModule {
}
