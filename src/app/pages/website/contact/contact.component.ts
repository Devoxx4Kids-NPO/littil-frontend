import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../components/button/button.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormInputSelectComponent } from '../../../components/forms/select-input/form-input-select.component';
import { FormInputTextComponent } from '../../../components/forms/text-input/form-input-text.component';
import { TitleComponent } from '../../../components/title/title.component';

@Component({
  selector: 'littil-contact',
  templateUrl: './contact.component.html',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    ContentContainerComponent,
    FormInputSelectComponent,
    FormInputTextComponent,
    ReactiveFormsModule,
    TitleComponent,
    FooterComponent,
  ],
})
export class ContactComponent {}
