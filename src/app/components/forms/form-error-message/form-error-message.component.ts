import { Component, Input } from '@angular/core';

@Component({
  selector: 'littil-form-error-message',
  templateUrl: './form-error-message.component.html',
})
export class FormErrorMessageComponent {
  @Input() errorText: string = '';
}
