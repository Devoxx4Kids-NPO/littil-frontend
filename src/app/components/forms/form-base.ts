import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'littil-form-base',
  template: '',
})
export class FormBaseComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() maxLength!: string;
  @Input() widthClass: string = 'w-full';
  @Input() marginBottom: boolean = true;
  @Input() textWhite: boolean = false;
  @Input() disabled: boolean = false;
  @Input() hasError: boolean = false;
  @Output() onValueChanged: EventEmitter<string> = new EventEmitter<string>();

  public defaultClasses =
    'appearance-none border rounded py-2 px-3 mb-2 text-gray-700 placeholder:text-sm leading-tight ring-0 focus:ring-2 focus:ring-opacity-40';

  public _value: string = '';

  set value(value: string) {
    this._value = value;
    this.onChange(value);
    this.onValueChanged.emit(value);
  }

  get value(): string {
    return this._value;
  }

  onChange = (event: any) => {};
  onTouched = (event: any) => {};

  public writeValue(value: string) {
    this.value = value;
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  public getCssClasses(): string {
    let classString = this.widthClass + ' ' + this.defaultClasses + ' ';
    if (!this.hasError && !this.disabled) {
      classString +=
        'border-yellow-100 focus:border-yellow-200 placeholder:text-yellow-100 focus:ring-yellow-200';
    }
    if (this.hasError) {
      classString += 'border-red-500 focus:border-red-500 focus:ring-red-600';
    }
    if (this.disabled) {
      classString += 'border-gray-50 focus:ring-0 placeholder:text-gray-50';
    }
    return classString;
  }
}
