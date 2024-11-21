import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { ContactBannerComponent } from '../../../components/contact-banner/contact-banner.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { TitleComponent } from '../../../components/title/title.component';

@Component({
  selector: 'littil-about-us',
  templateUrl: './about-us.component.html',
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
export class AboutUsComponent {
  managementMock: { name: string; role: string; image?: string }[] = [
    {
      name: 'Koen Aerts',
      role: 'Voorzitter Devoxx4Kids Nederland',
      image: 'koen.jpg',
    },
    {
      name: 'Saskia Vermeer Ooms',
      role: 'Secretaris Devoxx4Kids Nederland',
      image: 'saskia.jpg',
    },
    {
      name: 'Eddy Vos',
      role: 'Penningmeester Devoxx4Kids Nederland / Product owner LITTIL',
      image: 'eddy.jpg',
    },
    {
      name: 'Pepijn Schildkamp',
      role: 'Bestuurslid Devoxx4Kids Nederland',
      image: 'pepijn.jpg',
    },
    {
      name: 'Anja van Hagen',
      role: 'Lead Front-End Developers LITTIL',
      image: 'anja.jpg',
    },
    {
      name: 'Lennert Gijsen',
      role: 'Lead Infra LITTIL',
      image: 'lennert.jpg',
    },
    {
      name: 'Marcel Wildenburg',
      role: 'Lead Back-End Developers LITTIL',
      image: 'marcel.jpg',
    },
  ];

  constructor(private router: Router) {}

  navToContact(): void {
    this.router.navigateByUrl('contact');
  }
}
