import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'littil-modules',
  templateUrl: './modules.component.html',
})
export class ModulesComponent {

  

  constructor(private router: Router) {
  }

    navToContact(): void {
    this.router.navigateByUrl('contact');
  }
}
