import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'littil-about-us',
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent {

  managementMock: { name: string, role: string, image?: string }[] = [
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
      role: 'Penningmeester Devoxx4Kids Nederland',
      image: 'eddy.jpg',
    },
    {
      name: 'Eddy Vos',
      role: 'Product Owner / Scrum Master Devoxx4Kids LITTIL',
      image: 'eddy.jpg',
    },
    {
      name: 'Pepijn Schildkamp',
      role: 'Lead Back-End Developers Devoxx4Kids Nederland',
      image: 'pepijn.jpg',
    },
    {
      name: 'Anja van Hagen',
      role: 'Lead Front-End Developers Devoxx4Kids Nederland',
      image: 'anja.jpg',
    },
    {
      name: 'Lennert Gijsen',
      role: 'Lead Infra Devoxx4Kids Nederland',
      image: 'lennert.jpg',
    },
  ];

  constructor(private router: Router) {
  }

    navToContact(): void {
    this.router.navigateByUrl('contact');
  }
}
