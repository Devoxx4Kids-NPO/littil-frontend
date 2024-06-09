import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'littil-modules',
  templateUrl: './modules.component.html',
})
export class ModulesComponent {

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

  constructor(private router: Router) {
  }

    navToContact(): void {
    this.router.navigateByUrl('contact');
  }
}
