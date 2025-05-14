import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactBannerComponent } from '../../../components/contact-banner/contact-banner.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { TitleComponent } from '../../../components/title/title.component';

@Component({
  selector: 'littil-about-us',
  templateUrl: './about-us.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ContentContainerComponent,
    TitleComponent,
    ContactBannerComponent,
  ],
})
export class AboutUsComponent {}
