import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule, Routes } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ButtonComponent } from '../../../components/button/button.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormInputSelectComponent } from '../../../components/forms/select-input/form-input-select.component';
import { FormInputTextComponent } from '../../../components/forms/text-input/form-input-text.component';
import { SearchFormComponent } from './search-form.component';
import { SearchComponent } from './search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
];

@NgModule({
  declarations: [SearchComponent, SearchFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LeafletModule,
    ContentContainerComponent,
    ButtonComponent,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    FormInputSelectComponent,
    FormInputTextComponent,
    FooterComponent,
  ],
  providers: [],
  exports: [SearchComponent],
})
export class SearchModule {}
