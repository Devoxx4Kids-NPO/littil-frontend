import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactBannerComponent } from '../../../components/contact-banner/contact-banner.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { TitleComponent } from '../../../components/title/title.component';

@Component({
  selector: 'littil-admin',
  templateUrl: './admin.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ContentContainerComponent,
    TitleComponent,
    ContactBannerComponent,
    FooterComponent,
  ],
})
export class AdminComponent {}
