import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'littil-main-menu-button',
  templateUrl: './main-menu-button.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class MainMenuButtonComponent {
  @Input() path?: string;
}
