import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from '../../../components/footer/footer.module';
import { SearchComponent } from './search.component';
import { ContentContainerModule } from '../../../components/content-container/content-container.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet'
import { ButtonModule } from '../../../components/button/button.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import {FormInputSelectModule} from "../../../components/forms/select-input/form-input-select.module";
import {SearchFormComponent} from "./search-form.component";
import {FormInputTextModule} from "../../../components/forms/text-input/form-input-text.module";

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
    ContentContainerModule,
    ButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormInputSelectModule,
    FormInputTextModule,
    FooterModule,
  ],
  providers: [],
  exports: [SearchComponent],
  entryComponents: [],
})
export class SearchModule {}
