import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBaseComponent } from '../form-base';

@Component({
  selector: 'littil-form-input-radio',
  templateUrl: './form-input-radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputRadioComponent),
      multi: true,
    },
  ],
})
export class FormInputRadioComponent
  extends FormBaseComponent
  implements ControlValueAccessor
{
  @Input() radioInputs: RadioInput[] = [];
}

export interface RadioInput {
  id: string;
  description: string;
  checked: boolean;
}
