import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { TitleComponent } from '../../../components/title/title.component';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
];

@NgModule({
  declarations: [BlogComponent],
  imports: [CommonModule, ContentContainerComponent, RouterModule.forChild(routes), TitleComponent],
})
export class BlogModule {}
