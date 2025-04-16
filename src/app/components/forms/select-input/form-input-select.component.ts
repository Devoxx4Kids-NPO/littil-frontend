import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBaseComponent } from '../form-base';

@Component({
  selector: 'littil-form-select-text',
  templateUrl: './form-input-select.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FormInputSelectComponent extends FormBaseComponent {}
