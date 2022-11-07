import { Component, Input } from '@angular/core';
import { IMenuItem } from '../../pages/menu.routes';

@Component({
  selector: 'littil-main-menu-dropdown-button',
  templateUrl: './main-menu-dropdown-button.component.html',
})
export class MainMenuDropdownButtonComponent {
  @Input() path?: string;
  @Input() subRoutes?: IMenuItem[];
}
