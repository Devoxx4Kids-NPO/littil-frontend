import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'littil-button-rounded',
  templateUrl: './button-rounded.component.html',
})
export class ButtonRoundedComponent  {
  @Input() colorClass: string = 'blue-200';
  @Input() hoverColorClass: string = 'blue-300'
  @Input() inline: boolean = false;
  @Output() public onClick = new EventEmitter<any>();

  get colorClasses(): string {
    return `bg-${this.colorClass} hover:bg-${this.hoverColorClass} focus-visible:outline-${this.colorClass}`
  }
}
