import { Component, Input } from '@angular/core';

@Component({
  selector: 'littil-main-menu-button',
  templateUrl: './main-menu-button.component.html',
})
export class MainMenuButtonComponent {
  @Input() path?: string;
}
