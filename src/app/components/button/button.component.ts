import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from "@angular/core";

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

  /** Make the host element behave like a button for linters and AT */
  @HostBinding('attr.role') role = 'button';
  @HostBinding('attr.tabindex') get tabIndex() { return this.disabled ? -1 : 0; }
  @HostBinding('attr.aria-disabled') get ariaDisabled() { return String(this.disabled); }

  
  @HostListener('keydown.space', ['$event'])
  onSpace(event: KeyboardEvent) {
    if (this.disabled) return;
    // Prevent native click on keyup and keep single activation
    event.preventDefault();
    this.onClick.emit(event);
  }

  @HostListener('keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    if (this.disabled) return;
    event.preventDefault();
    this.onClick.emit(event);
  }


}
