import { Component } from '@angular/core';

@Component({
  selector: 'littil-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly today = new Date();
}
