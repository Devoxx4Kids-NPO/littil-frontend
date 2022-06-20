import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBaseComponent } from '../form-base';

@Component({
  selector: 'littil-form-input-text',
  templateUrl: './form-input-text.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputTextComponent),
      multi: true,
    },
  ],
})
export class FormInputTextComponent
  extends FormBaseComponent
  implements ControlValueAccessor
{
  @Input() placeholder: string = '';
}
