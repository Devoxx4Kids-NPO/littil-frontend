import { Component } from '@angular/core';

@Component({
  selector: 'littil-devoxx4kids',
  templateUrl: './devoxx4kids.component.html',
})
export class Devoxx4kidsComponent {

  navToDevoxx(): void {
    window.open('http://www.devoxx4kids.org/nederland/', '_blank');
  }
}
