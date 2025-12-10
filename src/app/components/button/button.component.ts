import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'littil-button',
  templateUrl: './button.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ButtonComponent {
  @Input() customColorClass: string | undefined;
  @Input() color: 'blue' | 'yellow' | 'red' | 'gray' |undefined;
  @Input() disabledColor: 'blue' | 'yellow' | 'red' | 'gray' |undefined;
  @Input() inline: boolean = false;
  @Input() disabled: boolean = false;
  @Output() public onClick = new EventEmitter<any>();

  ngOnInit(): void {
    if (!this.customColorClass && !this.color) {
      this.color = 'blue';
    }
    if (!this.disabledColor) {
      this.disabledColor = 'gray';
    }
  }

  private colorVariant = {
    blue: 'bg-blue-200 hover:bg-blue-300 focus-visible:outline-blue-200',
    yellow: 'bg-yellow-200 hover:bg-yellow-100 focus-visible:outline-yellow-200',
    red: 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600',
    gray: 'bg-gray-300 text-gray-700 hover:bg-gray-300 focus-visible:outline-gray-200',
  };

  get colorClasses(): string {
    if (this.disabled && this.disabledColor) {
      return this.colorVariant[this.disabledColor];
    }
    if (this.color) {
      return this.colorVariant[this.color];
    }
    return `${this.customColorClass}`;
  }
}
