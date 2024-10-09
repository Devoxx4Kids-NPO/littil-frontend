import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'littil-form-base',
  template: '',
})
export class FormBaseComponent implements ControlValueAccessor {
  @Input() id: string;
  @Input() label: string;
  @Input() maxLength: string;
  @Input() marginBottom: boolean = true;
  @Input() textWhite: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onValueChanged: EventEmitter<string> = new EventEmitter<string>();

  public defaultClasses =
    'appearance-none border rounded py-2 px-3 text-gray-700 placeholder:text-sm leading-tight ring-0 focus:ring-2 focus:ring-opacity-40';

  private _value: string = '';

  set value(value: string) {
    this._value = value;
    this.onChange(value);
    this.onValueChanged.emit(value);
  }

  get value(): string {
    return this._value;
  }

  get invalid(): boolean {
    return this.control ? !!this.control.invalid : false;
  }

  get showError(): boolean {
    if (!this.control) return false;
    const { dirty, touched } = this.control;
    return this.invalid ? !!dirty || !!touched : false;
  }

  constructor(@Self() @Optional() public control: NgControl) {
    this.control && (this.control.valueAccessor = this);
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
    let classString = this.defaultClasses + ' ';
    if (!this.showError && !this.disabled) {
      classString +=
        'border-yellow-100 focus:border-yellow-200 placeholder:text-yellow-100 focus:ring-yellow-200';
    }
    if (this.showError) {
      classString += 'border-red-500 focus:border-red-500 focus:ring-red-600';
    }
    if (this.disabled) {
      classString += 'border-gray-50 focus:ring-0 placeholder:text-gray-50';
    }
    return classString;
  }
}
