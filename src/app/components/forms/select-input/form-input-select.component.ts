import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBaseComponent } from '../form-base';

@Component({
  selector: 'littil-form-select-text',
  templateUrl: './form-input-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputSelectComponent),
      multi: true,
    },
  ],
})
export class FormInputSelectComponent
  extends FormBaseComponent
  implements ControlValueAccessor {}
