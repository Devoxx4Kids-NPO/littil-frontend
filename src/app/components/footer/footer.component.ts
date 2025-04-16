import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentContainerComponent } from '../content-container/content-container.component';

@Component({
  selector: 'littil-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [CommonModule, ContentContainerComponent, RouterLink],
})
export class FooterComponent {
  readonly today = new Date();
}
