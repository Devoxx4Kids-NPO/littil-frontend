import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'littil-contact-banner',
  templateUrl: './contact-banner.component.html',
})
export class ContactBannerComponent {
  constructor(private router: Router) {
  }

  navToContact(): void {
    this.router.navigateByUrl('contact');
  }
}
