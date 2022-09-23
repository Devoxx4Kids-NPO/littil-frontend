import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'littil-about-us',
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent {

  managementMock: any[] = [
    {
      name: 'Koen Aerts',
      role: 'Voorzitter Devoxx4Kids Nederland'
    },
    {
      name: 'Saskia Vermeer Ooms',
      role: 'Secretaris Devoxx4Kids Nederland'
    },
    {
      name: 'Eddy Vos',
      role: 'Penningmeester Devoxx4Kids Nederland'
    },
    {
      name: 'Eddy Vos',
      role: 'Product Owner / Scrum Master Devoxx4Kids LITTIL'
    },
    {
      name: 'Pepijn Schildkamp',
      role: 'Lead Back-End Developers Devoxx4Kids Nederland'
    },
    {
      name: 'Anja van Hagen',
      role: 'Lead Front-End Developers Devoxx4Kids Nederland'
    },
  ];

  constructor(private router: Router) {
  }

  navToContact(): void {
    this.router.navigateByUrl('');
  }
}
