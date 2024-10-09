import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'littil-contact-banner',
  templateUrl: './contact-banner.component.html',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
})
export class ContactBannerComponent {
  constructor(private router: Router) {}

  navToContact(): void {
    this.router.navigateByUrl('contact');
  }
}
