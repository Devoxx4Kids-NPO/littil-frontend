import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'littil-button-rounded',
  templateUrl: './button-rounded.component.html',
})
export class ButtonRoundedComponent implements OnInit {
  @Input() customColorClass: string | undefined
  @Input() color: 'blue' | 'yellow' | undefined
  @Input() inline: boolean = false;
  @Output() public onClick = new EventEmitter<any>();

  ngOnInit(): void {
    if (!this.customColorClass && !this.color) {
      this.color = 'blue'
    }
  }

  private colorVariant = {
    'blue': 'bg-blue-200 hover:bg-blue-300 focus-visible:outline-blue-200',
    'yellow': 'bg-yellow-200 hover:bg-yellow-100 focus-visible:outline-yellow-200',
  }

  get colorClasses(): string {
    if (this.color) {
      return this.colorVariant[this.color]
    }
    return `${this.customColorClass}`
  }
}
