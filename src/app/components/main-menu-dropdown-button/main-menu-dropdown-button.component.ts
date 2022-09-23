import { Component, Input } from '@angular/core';

@Component({
  selector: 'littil-main-menu-dropdown-button',
  templateUrl: './main-menu-dropdown-button.component.html',
})
export class MainMenuDropdownButtonComponent {
  @Input() path?: string;
  @Input() subRoutes?: {path: string, menuText: string}[];
}
