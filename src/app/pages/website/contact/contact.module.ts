import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormInputSelectComponent } from '../../../components/forms/select-input/form-input-select.component';
import { FormInputTextComponent } from '../../../components/forms/text-input/form-input-text.component';
import { TitleComponent } from '../../../components/title/title.component';
import { ContactComponent } from './contact.component';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
  },
];

@NgModule({
  declarations: [ContactComponent],
  imports: [
    ButtonComponent,
    CommonModule,
    ContentContainerComponent,
    FormInputSelectComponent,
    FormInputTextComponent,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TitleComponent,
    FooterComponent,
  ],
})
export class ContactModule {}
