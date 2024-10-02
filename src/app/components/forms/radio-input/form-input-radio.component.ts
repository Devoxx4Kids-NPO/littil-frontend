import { Component, Input } from '@angular/core';
import { FormBaseComponent } from '../form-base';

@Component({
  selector: 'littil-form-input-radio',
  templateUrl: './form-input-radio.component.html',
})
export class FormInputRadioComponent extends FormBaseComponent {
  @Input() radioInputs: RadioInput[] = [];
}

export interface RadioInput {
  id: string;
  description: string;
  checked: boolean;
}
