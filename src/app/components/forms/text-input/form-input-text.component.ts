import { Component, Input } from '@angular/core';
import { FormBaseComponent } from '../form-base';

@Component({
  selector: 'littil-form-input-text',
  templateUrl: './form-input-text.component.html',
})
export class FormInputTextComponent extends FormBaseComponent {
  @Input() placeholder: string = '';
}
