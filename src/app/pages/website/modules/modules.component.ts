import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { ContactBannerComponent } from '../../../components/contact-banner/contact-banner.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { TitleComponent } from '../../../components/title/title.component';

@Component({
  selector: 'littil-modules',
  templateUrl: './modules.component.html',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    ContentContainerComponent,
    TitleComponent,
    FooterComponent,
    ContactBannerComponent,
  ],
})
export class ModulesComponent {
  constructor(private router: Router) {}

  navToContact(): void {
    this.router.navigateByUrl('contact');
  }
}
