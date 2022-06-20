import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'littil-form-base',
  template: '',
})
export class FormBaseComponent {
  @Input() id!: string;
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() hasError: boolean = false;
  @Output() onValueChanged: EventEmitter<string> = new EventEmitter<string>();

  private _value: string = '';

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

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
