import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'littil-content-container',
  templateUrl: './content-container.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ContentContainerComponent {
  @Input()
  public outerClasses = '';

  @Input()
  public innerClasses = '';

  @Input()
  public widthClass = 'max-w-screen-lg';
}
