import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IMenuItem } from '../../pages/menu.routes';

@Component({
  selector: 'littil-main-menu-dropdown-button',
  templateUrl: './main-menu-dropdown-button.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class MainMenuDropdownButtonComponent {
  @Input() title?: string;
  @Input() path?: string;
  @Input() subRoutes?: IMenuItem[];
}
